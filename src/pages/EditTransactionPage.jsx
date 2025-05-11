import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditTransactionPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [amount, setAmount] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [type, setType] = useState('')
	const [member, setMember] = useState('')
	const [date, setDate] = useState('')
	const [categories, setCategories] = useState([])
	const [members, setMembers] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem('access_token')
		const fetchData = async () => {
			try {
				const [transRes, catRes, memRes] = await Promise.all([
					axios.get(`http://127.0.0.1:8000/api/transactions/${id}/`, {
						headers: { Authorization: `Bearer ${token}` },
					}),
					axios.get('http://127.0.0.1:8000/api/categories/', {
						headers: { Authorization: `Bearer ${token}` },
					}),
					axios.get('http://127.0.0.1:8000/api/family/members/', {
						headers: { Authorization: `Bearer ${token}` },
					}),
				])
				const data = transRes.data
				setAmount(data.amount)
				setDescription(data.description)
				setCategory(data.category)
				setMember(data.member)
				setDate(data.date)
				setType(data.type)

				setCategories(catRes.data?.results || catRes.data || [])
				setMembers(memRes.data?.results || memRes.data || [])
			} catch (error) {
				console.error('Ошибка загрузки данных', error)
				alert('Ошибка при загрузке данных')
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [id])

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.patch(
				`http://127.0.0.1:8000/api/transactions/${id}/`,
				{ amount, description, category, member, date, type },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			navigate('/transactions')
		} catch (err) {
			console.error('Ошибка обновления', err)
			alert('Не удалось обновить транзакцию')
		}
	}

	const handleDelete = async () => {
		if (window.confirm('Вы уверены, что хотите удалить транзакцию?')) {
			try {
				await axios.delete(`http://127.0.0.1:8000/api/transactions/${id}/`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				})
				navigate('/transactions')
			} catch (err) {
				console.error('Ошибка удаления', err)
				alert('Не удалось удалить транзакцию')
			}
		}
	}

	if (loading) return <p>Загрузка...</p>

	return (
		<div className='form-container'>
			<h2>Редактировать транзакцию</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='number'
					value={amount}
					onChange={e => setAmount(e.target.value)}
					required
				/>
				<input
					type='text'
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
				<button type='submit'>Сохранить</button>
				<button
					type='button'
					style={{ marginTop: '10px', backgroundColor: '#ef4444' }}
					onClick={handleDelete}
				>
					Удалить
				</button>
			</form>
		</div>
	)
}

export default EditTransactionPage
