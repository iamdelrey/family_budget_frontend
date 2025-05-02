import axios from 'axios'
import { useEffect, useState } from 'react'

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
		<div>
			<h2>Ваш профиль</h2>
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
	)
}

export default MePage
