import axios from 'axios'
import { useEffect, useState } from 'react'

function CategoriesPage() {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

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

				console.log('Categories response:', response.data)

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
			<ul>
				{categories.length > 0 ? (
					categories.map(cat => (
						<li key={cat.id}>
							<strong>{cat.name}</strong> — {cat.description}
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
