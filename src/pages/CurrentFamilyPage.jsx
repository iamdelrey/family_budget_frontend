import axios from 'axios'
import { useEffect, useState } from 'react'

function CurrentFamilyPage() {
	const [family, setFamily] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchFamily = async () => {
			try {
				const token = localStorage.getItem('access_token')
				const response = await axios.get(
					'http://127.0.0.1:8000/api/family/me/',
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setFamily(response.data)
			} catch (err) {
				console.error('Ошибка загрузки семьи:', err)
				setError('Не удалось загрузить информацию о семье')
			} finally {
				setLoading(false)
			}
		}
		fetchFamily()
	}, [])

	if (loading) return <p>Загрузка...</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div>
			<h2>Моя семья</h2>
			<p>
				<strong>Название:</strong> {family.name}
			</p>
			<p>
				<strong>Создатель:</strong> {family.created_by}
			</p>
			<p>
				<strong>Моя роль:</strong>{' '}
				{family.role === 'head' ? 'Глава семьи' : 'Участник'}
			</p>
		</div>
	)
}

export default CurrentFamilyPage
