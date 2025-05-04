import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CategoriesPage() {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
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
						headers: {
							Authorization: `Bearer ${token}`,
						},
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

		fetchCategories()
	}, [])

	if (loading) return <p>Загрузка категорий...</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div>
			<h2>Категории бюджета</h2>

			<button onClick={() => navigate('/add-category')}>
				Добавить категорию
			</button>

			<ul>
				{categories.length > 0 ? (
					categories.map(cat => (
						<li key={cat.id}>
							<strong>{cat.name}</strong> — {cat.description}{' '}
							<Link to={`/edit-category/${cat.id}`}>Редактировать</Link>
						</li>
					))
				) : (
					<p>Категории не найдены</p>
				)}
			</ul>
		</div>
	)
}

export default CategoriesPage
