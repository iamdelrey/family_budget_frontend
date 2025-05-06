import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.post('http://127.0.0.1:8000/api/register/', {
				username,
				email,
				password,
			})
			navigate('/login')
		} catch (err) {
			console.error(err)
			setError('Ошибка регистрации. Проверьте данные.')
		}
	}

	return (
		<div className='form-container'>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Имя пользователя'
					value={username}
					onChange={e => setUsername(e.target.value)}
					required
				/>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<input
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<button type='submit'>Зарегистрироваться</button>
			</form>
			{error && <p className='error-text'>{error}</p>}
		</div>
	)
}

export default RegisterPage
