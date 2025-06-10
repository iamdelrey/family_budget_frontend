import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/CategoriesPage.css'

function CategoriesPage() {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const fetchCategories = async () => {
		const token = localStorage.getItem('access_token')
		if (!token) {
			setError('Нет access_token')
			setLoading(false)
			return
		}

		try {
			const response = await axios.get(
				'http://127.0.0.1:8000/api/categories/',
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)

			const data = Array.isArray(response.data)
				? response.data
				: response.data.results || []

			setCategories(data)
		} catch (err) {
			console.error('Ошибка загрузки категорий:', err)
			setError('Не удалось загрузить категории')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchCategories()
	}, [])

	const handleDelete = async id => {
		if (!window.confirm('Удалить эту категорию?')) return
		try {
			await axios.delete(`http://127.0.0.1:8000/api/categories/${id}/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			})
			setCategories(prev => prev.filter(cat => cat.id !== id))
		} catch (err) {
			console.error('Ошибка при удалении категории', err)
			alert('Не удалось удалить категорию')
		}
	}

	return (
		<div className='categories-container'>
			<div className='categories-header'>
				<h2>Категории бюджета</h2>
				<button className='add-btn' onClick={() => navigate('/add-category')}>
					+ Добавить категорию
				</button>
			</div>

			{loading ? (
				<p>Загрузка категорий...</p>
			) : error ? (
				<p className='error'>{error}</p>
			) : categories.length === 0 ? (
				<p className='empty'>Категории не найдены</p>
			) : (
				<div className='category-grid'>
					{categories.map(cat => (
						<div key={cat.id} className='category-card'>
							<div className='category-header'>
								<h3>{cat.name}</h3>
								<span className='category-actions'>
									<Link to={`/edit-category/${cat.id}`}>✏️</Link>
									<button onClick={() => handleDelete(cat.id)}>🗑️</button>
								</span>
							</div>
							<p className='category-desc'>{cat.description}</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default CategoriesPage
