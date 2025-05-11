import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function TransactionsPage() {
	const [transactions, setTransactions] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const token = localStorage.getItem('access_token')
				const response = await axios.get(
					'http://127.0.0.1:8000/api/transactions/',
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)

				const data = Array.isArray(response.data)
					? response.data
					: response.data.results || []

				setTransactions(data)
			} catch (err) {
				console.error('Ошибка загрузки транзакций:', err)
				setError('Не удалось загрузить транзакции')
			} finally {
				setLoading(false)
			}
		}
		fetchTransactions()
	}, [])

	if (loading) return <p>Загрузка транзакций...</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div className='container'>
			<h2>Транзакции</h2>
			<Link to='/add-transaction' className='link'>
				Добавить транзакцию
			</Link>
			<ul>
				{transactions.map(tx => (
					<li key={tx.id}>
						{tx.date} — <strong>{tx.amount} ₽</strong> ({tx.description}) —
						<Link to={`/edit-transaction/${tx.id}`}> ред.</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TransactionsPage
