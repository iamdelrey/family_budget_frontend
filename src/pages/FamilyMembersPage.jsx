import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/FamilyMembersPage.css'

export default function FamilyMembersPage() {
	const [members, setMembers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const token = localStorage.getItem('access_token')
				const response = await axios.get(
					'http://127.0.0.1:8000/api/family/members/',
					{ headers: { Authorization: `Bearer ${token}` } }
				)
				setMembers(response.data)
			} catch (err) {
				console.error('Ошибка загрузки участников семьи', err)
				const detail = err.response?.data?.detail
				setError(detail || 'Не удалось загрузить участников семьи')
			} finally {
				setLoading(false)
			}
		}
		fetchMembers()
	}, [])

	const handleRemove = async userId => {
		if (!window.confirm('Удалить этого участника?')) return
		try {
			const token = localStorage.getItem('access_token')
			await axios.post(
				'http://127.0.0.1:8000/api/family/members/remove/',
				{ user_id: userId },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			setMembers(prev => prev.filter(m => m.id !== userId))
		} catch (err) {
			console.error('Ошибка удаления участника', err)
			alert(err.response?.data?.detail || 'Не удалось удалить участника')
		}
	}

	const handleLeave = async () => {
		if (!window.confirm('Вы точно хотите покинуть семью?')) return
		try {
			const token = localStorage.getItem('access_token')
			await axios.post(
				'http://127.0.0.1:8000/api/family/leave/',
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			navigate('/')
		} catch (err) {
			console.error('Ошибка выхода из семьи', err)
			alert(err.response?.data?.detail || 'Не удалось покинуть семью')
		}
	}

	const handlePromote = async userId => {
		if (!window.confirm('Назначить этого пользователя владельцем семьи?'))
			return
		try {
			const token = localStorage.getItem('access_token')
			await axios.post(
				'http://127.0.0.1:8000/api/family/members/change-role/',
				{ user_id: userId, new_role: 'owner' },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			setMembers(prev =>
				prev.map(m => ({
					...m,
					role:
						m.id === userId ? 'owner' : m.role === 'owner' ? 'member' : m.role,
				}))
			)
		} catch (err) {
			console.error('Ошибка назначения владельца семьи', err)
			alert(err.response?.data?.detail || 'Не удалось сменить владельца')
		}
	}

	if (loading) {
		return <p className='family-members-container'>Загрузка участников...</p>
	}

	if (error) {
		if (
			error === 'User is not part of any family' ||
			error.toLowerCase().includes('не состоит')
		) {
			return (
				<div className='family-members-container'>
					<h2>Вы не состоите в семье</h2>
					<div className='no-family-actions'>
						<button
							className='top-btn'
							onClick={() => navigate('/family/create')}
						>
							Создать семью
						</button>
						<button
							className='top-btn'
							onClick={() => navigate('/join-family')}
						>
							Присоединиться к семье
						</button>
					</div>
				</div>
			)
		}
		return <p className='family-members-container error'>{error}</p>
	}

	return (
		<div className='family-members-container'>
			<div className='members-header'>
				<h2>Участники семьи</h2>
				<div className='members-actions-top'>
					<button className='top-btn' onClick={() => navigate('/invite-code')}>
						Пригласить участника
					</button>
					<button className='top-btn' onClick={() => navigate('/join-family')}>
						Присоединиться к семье
					</button>
				</div>
			</div>

			<div className='members-grid'>
				{members.length > 0 ? (
					members.map(member => (
						<div key={member.id} className='member-card'>
							<div className='member-header'>
								<div className='member-info'>
									<strong className='member-name'>{member.username}</strong>
									<span className={`member-role ${member.role}`}>
										{member.role === 'owner' ? 'Владелец' : 'Участник'}
									</span>
								</div>
								<div className='member-actions'>
									{member.role === 'owner' ? (
										<button className='action-btn' disabled>
											Текущий владелец
										</button>
									) : (
										<>
											<button
												className='action-btn promote-btn'
												onClick={() => handlePromote(member.id)}
											>
												Сделать владельцем
											</button>
											<button
												className='action-btn remove-btn'
												onClick={() => handleRemove(member.id)}
											>
												Удалить
											</button>
										</>
									)}
								</div>
							</div>
							<p className='member-email'>{member.email}</p>
							{member.role !== 'owner' && (
								<button className='action-btn leave-btn' onClick={handleLeave}>
									Покинуть семью
								</button>
							)}
						</div>
					))
				) : (
					<p className='empty'>В семье нет участников</p>
				)}
			</div>
		</div>
	)
}
