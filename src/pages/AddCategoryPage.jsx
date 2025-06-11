import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/AddCategoryPage.css'

export default function AddCategoryPage() {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		if (!name.trim()) {
			setError('Название обязательно')
			return
		}
		setError(null)
		setLoading(true)
		try {
			await axios.post(
				'http://127.0.0.1:8000/api/categories/',
				{ name, description },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			navigate('/categories')
		} catch (err) {
			console.error('Ошибка при добавлении категории', err)
			setError(err.response?.data?.detail || 'Не удалось добавить категорию')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='add-category-container'>
			<h2 className='page-title'>Добавить категорию</h2>
			<form className='add-category-form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>Название</label>
					<input
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
						disabled={loading}
						placeholder='Введите название'
					/>
				</div>
				<div className='form-group'>
					<label>Описание</label>
					<textarea
						value={description}
						onChange={e => setDescription(e.target.value)}
						disabled={loading}
						placeholder='Краткое описание (необязательно)'
						rows={3}
					/>
				</div>
				{error && <p className='error-text'>{error}</p>}
				<button type='submit' className='save-btn' disabled={loading}>
					{loading ? 'Сохраняю...' : 'Добавить'}
				</button>
			</form>
		</div>
	)
}
