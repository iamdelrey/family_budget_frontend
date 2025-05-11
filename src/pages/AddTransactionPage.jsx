import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddTransactionPage() {
	const navigate = useNavigate()
	const [amount, setAmount] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [type, setType] = useState('')
	const [member, setMember] = useState('')
	const [date, setDate] = useState('')
	const [categories, setCategories] = useState([])
	const [members, setMembers] = useState([])

	useEffect(() => {
		const token = localStorage.getItem('access_token')
		const fetchData = async () => {
			try {
				const [catRes, memRes] = await Promise.all([
					axios.get('http://127.0.0.1:8000/api/categories/', {
						headers: { Authorization: `Bearer ${token}` },
					}),
					axios.get('http://127.0.0.1:8000/api/family/members/', {
						headers: { Authorization: `Bearer ${token}` },
					}),
				])
				setCategories(catRes.data?.results || catRes.data || [])
				setMembers(memRes.data?.results || memRes.data || [])
			} catch (err) {
				console.error('Ошибка загрузки данных', err)
			}
		}
		fetchData()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.post(
				'http://127.0.0.1:8000/api/transactions/',
				{ amount, description, category, member, date, type },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			navigate('/transactions')
		} catch (err) {
			console.error('Ошибка при добавлении транзакции', err)
			alert('Не удалось добавить транзакцию')
		}
	}

	return (
		<div className='form-container'>
			<h2>Добавить транзакцию</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='number'
					placeholder='Сумма'
					value={amount}
					onChange={e => setAmount(e.target.value)}
					required
				/>
				<input
					type='text'
					placeholder='Описание'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<select
					value={category}
					onChange={e => setCategory(e.target.value)}
					required
				>
					<option value=''>Выберите категорию</option>
					{categories.map(cat => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</select>
				<select value={type} onChange={e => setType(e.target.value)} required>
					<option value=''>Тип транзакции</option>
					<option value='income'>Доход</option>
					<option value='expense'>Расход</option>
				</select>
				<select
					value={member}
					onChange={e => setMember(e.target.value)}
					required
				>
					<option value=''>Выберите участника</option>
					{members.map(mem => (
						<option key={mem.id} value={mem.id}>
							{mem.username}
						</option>
					))}
				</select>
				<input
					type='date'
					value={date}
					onChange={e => setDate(e.target.value)}
					required
				/>
				<button type='submit'>Добавить</button>
			</form>
		</div>
	)
}

export default AddTransactionPage
