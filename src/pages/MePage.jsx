import axios from 'axios'
import { useEffect, useState } from 'react'
import '../styles/MePage.css'

function MePage() {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get('http://127.0.0.1:8000/api/me/', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				})
				setUser(res.data)
			} catch (error) {
				console.error('Ошибка получения пользователя', error)
				alert('Не удалось загрузить информацию о пользователе')
			}
		}

		fetchUser()
	}, [])

	if (!user) return <p>Загрузка...</p>

	return (
		<div className='me-container'>
			<h2>Профиль</h2>
			<div className='me-card'>
				<p>
					<strong>ID:</strong> {user.id}
				</p>
				<p>
					<strong>Имя пользователя:</strong> {user.username}
				</p>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
			</div>
		</div>
	)
}

export default MePage
