import axios from 'axios'
import { useEffect, useState } from 'react'

function FamilyMembersPage() {
	const [members, setMembers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchMembers = async () => {
		try {
			const token = localStorage.getItem('access_token')
			const response = await axios.get(
				'http://127.0.0.1:8000/api/family/members/',
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			setMembers(response.data)
		} catch (err) {
			console.error('Ошибка загрузки участников семьи:', err)
			setError('Не удалось загрузить участников семьи')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchMembers()
	}, [])

	const handleRemove = async userId => {
		if (!window.confirm('Удалить этого участника?')) return
		try {
			const token = localStorage.getItem('access_token')
			await axios.post(
				'http://127.0.0.1:8000/api/family/members/remove/',
				{ user_id: userId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			alert('Участник удалён')
			fetchMembers()
		} catch (err) {
			console.error('Ошибка при удалении участника', err)
			alert('Ошибка удаления участника')
		}
	}

	if (loading) return <p>Загрузка...</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div>
			<h2>Участники семьи</h2>
			<ul>
				{members.map(member => (
					<li key={member.id}>
						{member.username} — {member.email} ({member.role}) &nbsp;
						<button onClick={() => handleRemove(member.id)}>Удалить</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default FamilyMembersPage
