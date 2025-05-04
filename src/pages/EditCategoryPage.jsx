import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditCategoryPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/api/categories/${id}/`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('access_token')}`,
						},
					}
				)
				setName(response.data.name)
				setDescription(response.data.description)
			} catch (error) {
				console.error('Ошибка загрузки категории', error)
			}
		}
		fetchCategory()
	}, [id])

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.patch(
				`http://127.0.0.1:8000/api/categories/${id}/`,
				{ name, description },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			navigate('/categories')
		} catch (error) {
			console.error('Ошибка при обновлении категории', error)
			alert('Не удалось обновить категорию')
		}
	}

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
