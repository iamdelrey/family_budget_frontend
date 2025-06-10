import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/TransactionsPage.css'

function TransactionsPage() {
	const [transactions, setTransactions] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [month, setMonth] = useState(new Date().getMonth() + 1)
	const [year, setYear] = useState(new Date().getFullYear())

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

	const filtered = transactions.filter(tx => {
		const d = new Date(tx.date)
		return d.getFullYear() === +year && d.getMonth() + 1 === +month
	})

	return (
		<div className='transactions-container'>
			<div className='transactions-header'>
				<h2>Транзакции</h2>
				<Link to='/add-transaction' className='add-btn'>
					+ Добавить
				</Link>
			</div>

			<div className='filters'>
				<select value={month} onChange={e => setMonth(e.target.value)}>
					{Array.from({ length: 12 }, (_, i) => (
						<option key={i + 1} value={i + 1}>
							{new Date(0, i).toLocaleString('ru', { month: 'long' })}
						</option>
					))}
				</select>
				<select value={year} onChange={e => setYear(e.target.value)}>
					{[2024, 2025, 2026].map(y => (
						<option key={y} value={y}>
							{y}
						</option>
					))}
				</select>
			</div>

			{loading ? (
				<p>Загрузка транзакций...</p>
			) : error ? (
				<p className='error'>{error}</p>
			) : filtered.length === 0 ? (
				<p className='empty'>Нет транзакций за выбранный период</p>
			) : (
				<div className='transaction-list'>
					{filtered.map(tx => (
						<div key={tx.id} className='transaction-card'>
							<div className='tx-row'>
								<span className='tx-date'>{tx.date}</span>
								<span className={`tx-amount ${tx.type}`}>
									{tx.type === 'income' ? '+' : '-'}{' '}
									{parseFloat(tx.amount).toLocaleString()} ₽
								</span>
							</div>
							<div className='tx-description'>
								{tx.description || 'Без описания'}
							</div>
							<div className='tx-actions'>
								<Link to={`/edit-transaction/${tx.id}`}>✏️ Редактировать</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default TransactionsPage
