import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddCategoryPage() {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.post(
				'http://127.0.0.1:8000/api/categories/',
				{ name, description },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			navigate('/categories')
		} catch (error) {
			console.error('Ошибка при добавлении категории', error)
			alert('Не удалось добавить категорию')
		}
	}

	return (
		<div>
			<h2>Добавить категорию</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Название'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<br />
				<input
					type='text'
					placeholder='Описание'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<br />
				<button type='submit'>Добавить</button>
			</form>
		</div>
	)
}

export default AddCategoryPage
