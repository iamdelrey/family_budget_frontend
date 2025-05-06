import axios from 'axios'
import { useEffect, useState } from 'react'

function FamilyMembersPage() {
	const [members, setMembers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const currentUsername = localStorage.getItem('username')

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
			setError('Ошибка загрузки участников')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchMembers()
	}, [])

	const handleRemove = async userId => {
		if (!window.confirm('Удалить участника?')) return
		try {
			const token = localStorage.getItem('access_token')
			await axios.post(
				'http://127.0.0.1:8000/api/family/members/remove/',
				{ user_id: userId },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			setMembers(members.filter(m => m.id !== userId))
		} catch (err) {
			console.error(err)
			alert('Ошибка при удалении')
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
						{member.username} ({member.role})
						{member.username !== currentUsername && (
							<button
								onClick={() => handleRemove(member.id)}
								style={{ marginLeft: '10px' }}
							>
								Удалить
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export default FamilyMembersPage
