import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout({ children }) {
	const location = useLocation()
	const hideNavbar = ['/login', '/register'].includes(location.pathname)

	return (
		<div className='app-container'>
			{!hideNavbar && <Navbar />}
			<main>{children}</main>
		</div>
	)
}
