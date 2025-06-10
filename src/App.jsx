import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

import AddCategoryPage from './pages/AddCategoryPage'
import AddTransactionPage from './pages/AddTransactionPage'
import AnalyticsPage from './pages/AnalyticsPage'
import CategoriesPage from './pages/CategoriesPage'
import CreateFamilyPage from './pages/CreateFamilyPage'
import CurrentFamilyPage from './pages/CurrentFamilyPage'
import DashboardPage from './pages/DashboardPage'
import EditCategoryPage from './pages/EditCategoryPage'
import EditFamilyPage from './pages/EditFamilyPage'
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
			<Layout>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/' element={<DashboardPage />} />
					<Route path='/categories' element={<CategoriesPage />} />
					<Route path='/add-category' element={<AddCategoryPage />} />
					<Route path='/edit-category/:id' element={<EditCategoryPage />} />
					<Route path='/me' element={<MePage />} />
					<Route path='/family' element={<CurrentFamilyPage />} />
					<Route path='/family/members' element={<FamilyMembersPage />} />
					<Route path='/join-family' element={<JoinFamilyPage />} />
					<Route path='/invite-code' element={<InviteCodePage />} />
					<Route path='/transactions' element={<TransactionsPage />} />
					<Route path='/add-transaction' element={<AddTransactionPage />} />
					<Route path='/analytics' element={<AnalyticsPage />} />
					<Route
						path='/edit-transaction/:id'
						element={<EditTransactionPage />}
					/>
					<Route path='/family/create' element={<CreateFamilyPage />} />
					<Route path='/family/edit' element={<EditFamilyPage />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}

export default App
