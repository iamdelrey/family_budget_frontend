import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/token/', {
				username,
				password,
			})

			localStorage.setItem('access_token', response.data.access)
			localStorage.setItem('refresh_token', response.data.refresh)

			const meResponse = await axios.get('http://127.0.0.1:8000/api/me/', {
				headers: {
					Authorization: `Bearer ${response.data.access}`,
				},
			})
			localStorage.setItem('username', meResponse.data.username)

			navigate('/categories')
		} catch (error) {
			console.error(error)
			alert('Ошибка входа!')
		}
	}

	return (
		<div>
			<h1>Вход в систему</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Имя пользователя'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<br />
				<input
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<br />
				<button type='submit'>Войти</button>
			</form>
		</div>
	)
}

export default LoginPage
