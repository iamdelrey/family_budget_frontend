import { LogOut, User, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar() {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
		navigate('/login')
	}

	return (
		<nav className='navbar'>
			<div className='navbar-left'>
				<div className='navbar-logo'>
					<Link to='/'>
						<strong>BudgetApp</strong>
					</Link>
				</div>

				<ul className='navbar-links'>
					<li>
						<Link to='/'>Главная</Link>
					</li>
					<li>
						<Link to='/categories'>Категории</Link>
					</li>
					<li>
						<Link to='/transactions'>Транзакции</Link>
					</li>
					<li>
						<Link to='/analytics'>Аналитика</Link>
					</li>
					<li>
						<Link to='/family'>
							<Users size={16} /> Семья
						</Link>
					</li>
				</ul>
			</div>

			<div className='navbar-right'>
				<Link to='/me' className='account-link'>
					<User size={18} style={{ marginRight: '6px' }} />
					Аккаунт
				</Link>
				<button className='logout-btn' onClick={handleLogout}>
					<LogOut size={18} />
					Выйти
				</button>
			</div>
		</nav>
	)
}
