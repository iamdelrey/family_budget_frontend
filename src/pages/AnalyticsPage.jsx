import axios from 'axios'
import { useEffect, useState } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import '../styles/AnalyticsPage.css'

const COLORS = [
	'#8884d8',
	'#82ca9d',
	'#ffc658',
	'#ff7f50',
	'#00c49f',
	'#ffbb28',
]

function AnalyticsPage() {
	const [transactions, setTransactions] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const [income, setIncome] = useState(0)
	const [expense, setExpense] = useState(0)
	const [byCategory, setByCategory] = useState([])
	const [byDay, setByDay] = useState([])

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
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				const data = Array.isArray(response.data)
					? response.data
					: response.data.results || []

				setTransactions(data)
				analyzeData(data)
			} catch (err) {
				console.error('Ошибка при загрузке транзакций:', err)
				setError('Не удалось загрузить данные')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const analyzeData = txs => {
		let inc = 0
		let exp = 0
		const categoryMap = {}
		const dayMap = {}

		txs.forEach(tx => {
			const amount = parseFloat(tx.amount)
			const day = new Date(tx.date).getDate()
			if (tx.type === 'income') inc += amount
			else exp += amount

			const cat = tx.category_name || 'Без категории'
			if (tx.type === 'expense') {
				categoryMap[cat] = (categoryMap[cat] || 0) + amount
				dayMap[day] = (dayMap[day] || 0) + amount
			}
		})

		setIncome(inc)
		setExpense(exp)

		setByCategory(
			Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
		)
		setByDay(
			Object.entries(dayMap).map(([day, value]) => ({
				day: parseInt(day),
				amount: value,
			}))
		)
	}

	if (loading) return <p>Загрузка данных...</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div className='analytics-container'>
			<h2>Аналитика</h2>

			<div className='summary'>
				<div className='summary-card income'>
					Доход: +{income.toLocaleString()} ₽
				</div>
				<div className='summary-card expense'>
					Расход: -{expense.toLocaleString()} ₽
				</div>
			</div>

			<div className='chart-block'>
				<h3>Расходы по категориям</h3>
				<div className='chart-wrapper'>
					<ResponsiveContainer width='100%' height={300}>
						<PieChart>
							<Pie
								data={byCategory}
								dataKey='value'
								nameKey='name'
								cx='50%'
								cy='50%'
								outerRadius={100}
								label
							>
								{byCategory.map((entry, index) => (
									<Cell key={index} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className='chart-block'>
				<h3>Расходы по дням месяца</h3>
				<div className='chart-wrapper'>
					<ResponsiveContainer width='100%' height={300}>
						<BarChart data={byDay}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='day' />
							<YAxis />
							<Tooltip />
							<Bar dataKey='amount' fill='#8884d8' />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}

export default AnalyticsPage
