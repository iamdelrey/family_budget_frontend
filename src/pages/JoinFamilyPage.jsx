import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function JoinFamilyPage() {
	const [code, setCode] = useState('')
	const [message, setMessage] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const token = localStorage.getItem('access_token')
			const response = await axios.post(
				'http://127.0.0.1:8000/api/join/',
				{ code },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			setMessage(response.data.detail)
			navigate('/family-members')
		} catch (err) {
			console.error(err)
			setMessage(
				'Ошибка: ' + (err.response?.data?.detail || 'не удалось присоединиться')
			)
		}
	}

	return (
		<div>
			<h2>Присоединиться к семье</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={code}
					onChange={e => setCode(e.target.value)}
					placeholder='Введите инвайт-код'
				/>
				<br />
				<button type='submit'>Присоединиться</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	)
}

export default JoinFamilyPage
