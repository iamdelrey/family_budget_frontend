import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditCategoryPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const token = localStorage.getItem('access_token')
				const response = await axios.get(
					`http://127.0.0.1:8000/api/categories/${id}/`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				setName(response.data.name)
				setDescription(response.data.description)
			} catch (err) {
				console.error(err)
				setError('Ошибка загрузки категории')
			} finally {
				setLoading(false)
			}
		}
		fetchCategory()
	}, [id])

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const token = localStorage.getItem('access_token')
			await axios.patch(
				`http://127.0.0.1:8000/api/categories/${id}/`,
				{ name, description },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			navigate('/categories')
		} catch (err) {
			console.error(err)
			alert('Ошибка при обновлении категории')
		}
	}

	if (loading) return <p>Загрузка...</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div>
			<h2>Редактировать категорию</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Название'
				/>
				<br />
				<input
					type='text'
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder='Описание'
				/>
				<br />
				<button type='submit'>Сохранить</button>
			</form>
		</div>
	)
}

export default EditCategoryPage
