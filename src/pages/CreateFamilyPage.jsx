import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/CreateFamilyPage.css'

export default function CreateFamilyPage() {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		if (!name.trim()) {
			setError('Название не может быть пустым')
			return
		}
		setLoading(true)
		setError(null)
		try {
			const token = localStorage.getItem('access_token')
			await axios.post(
				'http://127.0.0.1:8000/api/family/create/',
				{ name },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			navigate('/family')
		} catch (err) {
			console.error('Ошибка создания семьи:', err)
			setError(err.response?.data?.detail || 'Не удалось создать семью')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='create-family-container'>
			<h2>Создать семью</h2>
			<form className='create-family-form' onSubmit={handleSubmit}>
				<label>
					Название семьи
					<input
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
						disabled={loading}
						placeholder='Введите название'
					/>
				</label>
				{error && <p className='error'>{error}</p>}
				<button type='submit' className='save-btn' disabled={loading}>
					{loading ? 'Создание...' : 'Создать'}
				</button>
			</form>
		</div>
	)
}
