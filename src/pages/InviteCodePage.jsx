import axios from 'axios'
import { useState } from 'react'
import '../styles/InviteCodePage.css'

export default function InviteCodePage() {
	const [code, setCode] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)

	const handleGenerate = async () => {
		setLoading(true)
		setError(null)
		setSuccess(false)
		try {
			const token = localStorage.getItem('access_token')
			const res = await axios.post(
				'http://127.0.0.1:8000/api/invite/', // ← правильный URL
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			setCode(res.data.code)
			setSuccess(true)
		} catch (err) {
			console.error('Ошибка генерации кода приглашения', err)
			setError(err.response?.data?.detail || 'Не удалось сгенерировать код')
		} finally {
			setLoading(false)
		}
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(code)
	}

	return (
		<div className='invite-container'>
			<h2>Код приглашения в семью</h2>
			<div className='invite-box'>
				<button
					className='generate-btn'
					onClick={handleGenerate}
					disabled={loading}
				>
					{loading ? 'Генерация...' : 'Сгенерировать код'}
				</button>

				{error && <p className='error'>{error}</p>}
				{success && code && (
					<div className='code-section'>
						<input type='text' readOnly value={code} className='code-input' />
						<button className='copy-btn' onClick={handleCopy}>
							Скопировать
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
