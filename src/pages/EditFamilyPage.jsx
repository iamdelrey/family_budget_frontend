import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/EditFamilyPage.css'

export default function EditFamilyPage() {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchFamily = async () => {
			try {
				const token = localStorage.getItem('access_token')
				const res = await axios.get('http://127.0.0.1:8000/api/family/me/', {
					headers: { Authorization: `Bearer ${token}` },
				})
				setName(res.data.name || '')
			} catch (err) {
				console.error('Ошибка загрузки данных семьи:', err)
				setError('Не удалось загрузить данные семьи')
			} finally {
				setLoading(false)
			}
		}
		fetchFamily()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		if (!name.trim()) {
			setError('Название не должно быть пустым')
			return
		}
		setSaving(true)
		setError(null)
		try {
			const token = localStorage.getItem('access_token')
			await axios.patch(
				'http://127.0.0.1:8000/api/family/me/',
				{ name: name.trim() },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			navigate('/family')
		} catch (err) {
			console.error('Ошибка сохранения имени семьи:', err)
			setError(err.response?.data?.detail || 'Не удалось сохранить изменения')
		} finally {
			setSaving(false)
		}
	}

	if (loading) return <p>Загрузка данных...</p>
	if (error && !saving) return <p className='error-text'>{error}</p>

	return (
		<div className='edit-family-container'>
			<h2>Редактировать семью</h2>
			<form className='edit-family-form' onSubmit={handleSubmit}>
				<label>
					Новое название
					<input
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
						disabled={saving}
					/>
				</label>
				{error && <p className='error-text'>{error}</p>}
				<div className='buttons'>
					<button
						type='button'
						className='cancel-btn'
						onClick={() => navigate('/family')}
						disabled={saving}
					>
						Отмена
					</button>
					<button type='submit' className='save-btn' disabled={saving}>
						{saving ? 'Сохранение...' : 'Сохранить'}
					</button>
				</div>
			</form>
		</div>
	)
}
