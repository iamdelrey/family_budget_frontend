import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function DashboardPage() {
	const [family, setFamily] = useState(null)
	const [members, setMembers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const username = localStorage.getItem('username')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('access_token')
				const config = { headers: { Authorization: `Bearer ${token}` } }

				const [familyRes, membersRes] = await Promise.all([
					axios.get('http://127.0.0.1:8000/api/family/me/', config),
					axios.get('http://127.0.0.1:8000/api/family/members/', config),
				])

				setFamily(familyRes.data)
				setMembers(membersRes.data)
			} catch (err) {
				console.error(err)
				setError('Ошибка загрузки информации')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <p>Загрузка...</p>
	if (error) return <p className='error'>{error}</p>

	return (
		<div className='container'>
			<h2>Добро пожаловать, {username}!</h2>

			{family && (
				<div className='family-info'>
					<h3>Семья: {family.name}</h3>
					<p>
						Глава семьи: <strong>{family.created_by}</strong>
					</p>
					<p>
						Ваша роль:{' '}
						<span className={`role ${family.role}`}>{family.role}</span>
					</p>
				</div>
			)}

			<hr />

			<h3>Участники семьи</h3>
			<div className='member-list'>
				{members.map(member => (
					<div key={member.id} className='member-card'>
						<div className='member-header'>
							<strong>{member.username}</strong>
							<span className={`role ${member.role}`}>{member.role}</span>
						</div>
						<p className='member-email'>{member.email}</p>
					</div>
				))}
			</div>

			<hr />

			<div
				style={{
					marginTop: '20px',
					display: 'flex',
					gap: '12px',
					flexWrap: 'wrap',
				}}
			>
				<Link className='link' to='/categories'>
					Категории бюджета
				</Link>
				<Link className='link' to='/family'>
					Управление семьей
				</Link>
				<Link className='link' to='/transactions'>
					Посмотреть все транзакции
				</Link>
				<Link to='/analytics' className='dashboard-button'>
					Аналитика
				</Link>
			</div>
		</div>
	)
}

export default DashboardPage
