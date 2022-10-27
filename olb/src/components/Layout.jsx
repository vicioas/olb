import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAllTokens } from '../redux/tokenSlice'
import { setUserDetails } from '../redux/userSlice'

const Layout = ({ children }) => {
	const [openMenu, setOpenMenu] = useState(false)

	const navigate = useNavigate()
	const dispatch = useDispatch()
	let pathName = useLocation().pathname

	const handleLogout = () => {
		// localStorage.removeItem('token')
		dispatch(
			setAllTokens({
				authToken: '',
				refreshToken: '',
			})
		)
		dispatch(
			setUserDetails({
				id: '',
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				ssn: '',
				address: '',
				dob: '',
				gender: '',
			})
		)
		navigate('/')
	}

	const handleOpenMenu = (event) => {
		setOpenMenu(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setOpenMenu(null)
	}

	return (
		<>
			<AppBar position="fixed" style={{ backgroundColor: 'black' }}>
				<Toolbar
					sx={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<img
						src="ncr-logo-alternate.png"
						alt="Bank Logo"
						onClick={() => {
							navigate('/home')
						}}
						style={{
							height: '40px',
							marginRight: '20px',
						}}
					/>

					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={() => {
								navigate('/home')
							}}
							color="inherit"
						>
							<HomeIcon
								sx={{
									color:
										pathName === '/home'
											? 'primary.main'
											: 'text.secondary',
									fontSize: '30px',
								}}
							/>
						</IconButton>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={() => {
								navigate('/transfer')
							}}
							color="inherit"
						>
							<TransferWithinAStationIcon
								sx={{
									color:
										pathName === '/transfer'
											? 'primary.main'
											: 'text.secondary',
									fontSize: '25px',
								}}
							/>
						</IconButton>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenMenu}
							color="inherit"
						>
							<AccountCircle
								sx={{
									color:
										pathName === '/update'
											? 'primary.main'
											: 'text.secondary',
									fontSize: '25px',
								}}
							/>
						</IconButton>
					</div>
					<Menu
						id="menu-appbar"
						anchorEl={openMenu}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(openMenu)}
						onClose={handleCloseMenu}
					>
						<MenuItem
							onClick={() => {
								navigate('/update')
							}}
						>
							Profile
						</MenuItem>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			<div style={{ marginTop: '90px' }}>{children}</div>
		</>
	)
}

export default Layout
