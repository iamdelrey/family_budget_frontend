import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CategoriesPage from './pages/CategoriesPage'
import LoginPage from './pages/LoginPage'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/categories' element={<CategoriesPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
