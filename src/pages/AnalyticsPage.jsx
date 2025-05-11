import axios from 'axios'
import { useEffect, useState } from 'react'

function AnalyticsPage() {
	const [transactions, setTransactions] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem('access_token')
			if (!token) {
				setError('Токен не найден. Пожалуйста, войдите в систему.')
				setLoading(false)
				return
			}

			try {
				const response = await axios.get(
					'http://127.0.0.1:8000/api/transactions/',
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setTransactions(response.data.results)
			} catch (err) {
				console.error('Ошибка при загрузке транзакций:', err)
				setError('Не удалось загрузить данные')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <p>Загрузка данных...</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div className='container'>
			<h2>Аналитика</h2>
			{transactions.length === 0 ? (
				<p>Транзакции не найдены</p>
			) : (
				<ul>
					{transactions.map(tx => (
						<li key={tx.id}>
							{tx.description} — {tx.amount} ₽ ({tx.date})
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default AnalyticsPage
