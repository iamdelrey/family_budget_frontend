import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddCategoryPage from './pages/AddCategoryPage'
import CategoriesPage from './pages/CategoriesPage'
import CurrentFamilyPage from './pages/CurrentFamilyPage'
import EditCategoryPage from './pages/EditCategoryPage'
import FamilyMembersPage from './pages/FamilyMembersPage'
import LoginPage from './pages/LoginPage'
import MePage from './pages/MePage'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/categories' element={<CategoriesPage />} />
				<Route path='/add-category' element={<AddCategoryPage />} />
				<Route path='/me' element={<MePage />} />
				<Route path='/edit-category/:id' element={<EditCategoryPage />} />
				<Route path='/family' element={<CurrentFamilyPage />} />
				<Route path='/family/members' element={<FamilyMembersPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
