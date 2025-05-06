import axios from 'axios'
import { useState } from 'react'

function InviteCodePage() {
	const [inviteCode, setInviteCode] = useState(null)
	const [error, setError] = useState(null)

	const generateCode = async () => {
		try {
			const token = localStorage.getItem('access_token')
			const response = await axios.post(
				'http://127.0.0.1:8000/api/invite/',
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			setInviteCode(response.data.code)
			setError(null)
		} catch (err) {
			console.error(err)
			setError('Не удалось создать инвайт-код. Возможно, вы не глава семьи.')
		}
	}

	return (
		<div>
			<h2>Создание инвайт-кода</h2>
			<button onClick={generateCode}>Создать инвайт-код</button>
			<br />
			{inviteCode && (
				<p>
					<strong>Инвайт-код:</strong> {inviteCode}
				</p>
			)}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	)
}

export default InviteCodePage
