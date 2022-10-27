import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import AccountPage from './pages/Accounts'
import HomePage from './pages/Home'
import TransferPage from './pages/Transfers'
import RegistrationPage from './pages/Registration'
import UpdateProfile from './pages/UpdateProfile'
import EditUpdate from './pages/EditUpdate'


export const theme = createTheme({
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	palette: {
		type: 'dark',
		primary: {
			main: '#54b948',
		},
		secondary: {
			main: '#545454',
		},
		tr: {
			main: '#1a53ff',
		},
		background: {
			default: '#000000',
			paper: '#101010',
		},

		text: {	
			primary: '#eee',
			secondary: '#aaa',
		},
	},
})

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				
				<Routes>
					<Route path="/home" element={<HomePage />} />
					<Route path="/account" element={<AccountPage />} />
					<Route path="/transfer" element={<TransferPage />} />
					<Route path="/login" element={<LoginPage/>} />
					<Route path="/register" element={<RegistrationPage/>} />
					<Route path="/update" element={<UpdateProfile/>} />
					<Route path="/EditUpdate" element={<EditUpdate/>} />
					<Route path="*" element={<Navigate to="/login" replace />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegistrationPage />} />
					<Route path="/update" element={<UpdateProfile />} />
					
					<Route
						path="*"
						element={<Navigate to="/login" replace />}
					/>
				</Routes>
				
			</ThemeProvider>
		</>
	)
}

export default App
