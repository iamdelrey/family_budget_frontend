import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/token/', {
				username,
				password,
			})

			localStorage.setItem('access_token', response.data.access)
			localStorage.setItem('refresh_token', response.data.refresh)
			localStorage.setItem('username', username)

			navigate('/categories')
		} catch (error) {
			console.error(error)
			setError('Неверное имя пользователя или пароль.')
		}
	}

	return (
		<div className='auth-container'>
			<h2>Вход в аккаунт</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Имя пользователя'
					value={username}
					onChange={e => setUsername(e.target.value)}
					required
				/>
				<div className='password-wrapper'>
					<input
						type='password'
						placeholder='Пароль'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
					<span className='icon'>🔒</span>
				</div>
				<button type='submit'>Войти</button>
			</form>
			{error && <p className='error-text'>{error}</p>}
			<p className='hint-text'>
				Нет аккаунта? <a href='/register'>Создать</a>
			</p>
		</div>
	)
}

export default LoginPage
