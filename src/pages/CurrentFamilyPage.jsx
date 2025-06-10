import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/CurrentFamilyPage.css'

export default function CurrentFamilyPage() {
	const [family, setFamily] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchFamily = async () => {
			try {
				const token = localStorage.getItem('access_token')
				const { data } = await axios.get(
					'http://127.0.0.1:8000/api/family/me/',
					{ headers: { Authorization: `Bearer ${token}` } }
				)
				setFamily(data)
			} catch (err) {
				console.error('Ошибка загрузки семьи:', err)
				const detail = err.response?.data?.detail
				setError(detail || 'Не удалось загрузить информацию о семье')
			} finally {
				setLoading(false)
			}
		}
		fetchFamily()
	}, [])

	if (loading) return <p className='family-container'>Загрузка...</p>

	if (error) {
		if (
			error === 'User is not part of any family' ||
			error.toLowerCase().includes('не состоит')
		) {
			return (
				<div className='family-container'>
					<h2>Вы не состоите в семье</h2>
					<div className='family-actions'>
						<button
							className='action-btn'
							onClick={() => navigate('/family/create')}
						>
							Создать семью
						</button>
						<button
							className='action-btn'
							onClick={() => navigate('/join-family')}
						>
							Присоединиться к семье
						</button>
					</div>
				</div>
			)
		}
		return <p className='family-container error'>{error}</p>
	}

	return (
		<div className='family-container'>
			<h2>Моя семья</h2>
			<div className='family-card'>
				<p>
					<strong>Название:</strong> {family.name}
				</p>
				<p>
					<strong>Создатель:</strong> {family.created_by}
				</p>
				<p>
					<strong>Роль:</strong>{' '}
					{family.role === 'owner' ? 'Владелец' : 'Участник'}
				</p>
				<div className='family-actions'>
					<button
						className='action-btn'
						onClick={() => navigate('/family/members')}
					>
						Участники
					</button>
					{family.role === 'owner' && (
						<button
							className='action-btn'
							onClick={() => navigate('/family/edit')}
						>
							Редактировать
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
