import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddCategoryPage from './pages/AddCategoryPage'
import AddTransactionPage from './pages/AddTransactionPage'
import AnalyticsPage from './pages/AnalyticsPage'
import CategoriesPage from './pages/CategoriesPage'
import CurrentFamilyPage from './pages/CurrentFamilyPage'
import DashboardPage from './pages/DashboardPage'
import EditCategoryPage from './pages/EditCategoryPage'
import EditTransactionPage from './pages/EditTransactionPage'
import FamilyMembersPage from './pages/FamilyMembersPage'
import InviteCodePage from './pages/InviteCodePage'
import JoinFamilyPage from './pages/JoinFamilyPage'
import LoginPage from './pages/LoginPage'
import MePage from './pages/MePage'

import RegisterPage from './pages/RegisterPage'
import TransactionsPage from './pages/TransactionsPage'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/categories' element={<CategoriesPage />} />
				<Route path='/add-category' element={<AddCategoryPage />} />
				<Route path='/edit-category/:id' element={<EditCategoryPage />} />
				<Route path='/me' element={<MePage />} />
				<Route path='/family' element={<CurrentFamilyPage />} />
				<Route path='/family/members' element={<FamilyMembersPage />} />
				<Route path='/join-family' element={<JoinFamilyPage />} />
				<Route path='/invite-code' element={<InviteCodePage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/' element={<DashboardPage />} />
				<Route path='/transactions' element={<TransactionsPage />} />
				<Route path='/add-transaction' element={<AddTransactionPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route
					path='/edit-transaction/:id'
					element={<EditTransactionPage />}
				/>{' '}
			</Routes>
		</BrowserRouter>
	)
}

export default App
