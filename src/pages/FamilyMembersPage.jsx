import axios from 'axios'
import { useEffect, useState } from 'react'

function FamilyMembersPage() {
	const [members, setMembers] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const token = localStorage.getItem('access_token')
				const response = await axios.get(
					'http://127.0.0.1:8000/api/family/members/',
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				setMembers(response.data)
			} catch (err) {
				console.error(err)
				setError('Ошибка загрузки участников семьи')
			} finally {
				setLoading(false)
			}
		}
		fetchMembers()
	}, [])

	if (loading) return <p className='container'>Загрузка участников семьи...</p>
	if (error) return <p className='container error'>{error}</p>

	return (
		<div className='container'>
			<h2>Участники семьи</h2>
			<div className='member-list'>
				{members.length > 0 ? (
					members.map(member => (
						<div key={member.id} className='member-card'>
							<div className='member-header'>
								<strong>{member.username}</strong>
								<span className={`role ${member.role}`}>
									{member.role === 'head' ? '👑 Глава' : '👤 Участник'}
								</span>
							</div>
							<p className='member-email'>{member.email}</p>
						</div>
					))
				) : (
					<p>В семье нет участников.</p>
				)}
			</div>
		</div>
	)
}

export default FamilyMembersPage
