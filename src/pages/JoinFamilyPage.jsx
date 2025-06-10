import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/JoinFamilyPage.css'

export default function JoinFamilyPage() {
	const [code, setCode] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		if (!code.trim()) {
			setError('Введите код приглашения')
			return
		}
		setLoading(true)
		setError(null)
		try {
			const token = localStorage.getItem('access_token')
			await axios.post(
				'http://127.0.0.1:8000/api/join/',
				{ code: code.trim() },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			navigate('/family')
		} catch (err) {
			console.error('Ошибка присоединения к семье:', err)
			setError(err.response?.data?.detail || 'Не удалось присоединиться')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='join-family-container'>
			<h2>Присоединиться к семье</h2>
			<form className='join-family-form' onSubmit={handleSubmit}>
				<label>
					Код приглашения
					<input
						type='text'
						value={code}
						onChange={e => setCode(e.target.value)}
						placeholder='Введите код приглашения'
						disabled={loading}
					/>
				</label>
				{error && <p className='error-text'>{error}</p>}
				<button type='submit' className='join-btn' disabled={loading}>
					{loading ? 'Отправка...' : 'Присоединиться'}
				</button>
			</form>
		</div>
	)
}
