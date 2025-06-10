import axios from 'axios'
import { useEffect, useState } from 'react'
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'
import '../styles/DashboardPage.css'

const COLORS = [
	'#8884d8',
	'#82ca9d',
	'#ffc658',
	'#ff7f50',
	'#00c49f',
	'#ffbb28',
]

function DashboardPage() {
	const [transactions, setTransactions] = useState([])
	const [month, setMonth] = useState(new Date().getMonth() + 1)
	const [year, setYear] = useState(new Date().getFullYear())

	const [income, setIncome] = useState(0)
	const [expense, setExpense] = useState(0)
	const [expenseByCategory, setExpenseByCategory] = useState([])

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await axios.get(
					'http://127.0.0.1:8000/api/transactions/',
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('access_token')}`,
						},
					}
				)
				const all = Array.isArray(response.data.results)
					? response.data.results
					: response.data
				setTransactions(all)
			} catch (err) {
				console.error('Ошибка загрузки транзакций:', err)
			}
		}
		fetchTransactions()
	}, [])

	useEffect(() => {
		const filtered = transactions.filter(tr => {
			const d = new Date(tr.date)
			return d.getFullYear() === +year && d.getMonth() + 1 === +month
		})

		let inc = 0
		let exp = 0
		const categoryMap = {}

		for (let t of filtered) {
			const amount = parseFloat(t.amount)
			if (t.type === 'income') {
				inc += amount
			} else {
				exp += amount
				const categoryName = t.category_name || 'Без категории'
				categoryMap[categoryName] = (categoryMap[categoryName] || 0) + amount
			}
		}

		setIncome(inc)
		setExpense(exp)

		const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
			name,
			value,
		}))
		setExpenseByCategory(categoryData)
	}, [transactions, month, year])

	return (
		<div className='dashboard-container'>
			<h2>Главная</h2>

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

			<div className='summary-cards'>
				<div className='card card-expense'>
					<p className='label'>Расход</p>
					<p className='value'>- {expense.toLocaleString()} ₽</p>
				</div>
				<div className='card card-budget'>
					<p className='label'>Бюджет</p>
					<p className='value'>0 ₽</p>
				</div>
				<div className='card card-income'>
					<p className='label'>Доход</p>
					<p className='value'>+ {income.toLocaleString()} ₽</p>
				</div>
				<div className='card card-balance'>
					<p className='label'>На счетах</p>
					<p className='value'>{(income - expense).toLocaleString()} ₽</p>
				</div>
			</div>

			<div className='chart-container'>
				<h3>Расходы по категориям</h3>
				<div style={{ width: '100%', height: 300 }}>
					<ResponsiveContainer>
						<PieChart>
							<Pie
								data={expenseByCategory}
								dataKey='value'
								nameKey='name'
								cx='50%'
								cy='50%'
								outerRadius={100}
								label
							>
								{expenseByCategory.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}

export default DashboardPage
