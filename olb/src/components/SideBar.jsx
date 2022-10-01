import React from 'react'

import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { useNavigate, useLocation } from 'react-router-dom'

const SideBar = () => {

	let navigate = useNavigate()
	let pathName = useLocation().pathname

	return (
		<List
			sx={{
				minWidth: 360,
				bgcolor: 'background.paper',
				position: 'fixed',
				height: '100vh',
				borderTopRightRadius: 40,
			}}
			component="nav"
			aria-labelledby="nested-list-subheader"
		>
			<ListItemButton onClick={() => {navigate("/home")}}>
				<ListItemIcon sx={{ color: pathName === "/home" ? 'primary.main' : 'text.secondary' }}>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText
					primary="Overview"
					sx={{ color: pathName === "/home" ? 'primary.main' : 'text.secondary' }}
				/>
			</ListItemButton>
			<ListItemButton onClick={() => {
				alert("Click on view details for a particular account from Overview.")
			}}>
				<ListItemIcon sx={{ color: pathName === "/account" ? 'primary.main' : 'text.secondary' }}>
					<AccountBalanceIcon />
				</ListItemIcon>
				<ListItemText
					primary="Account Details"
					sx={{ color: pathName === "/account" ? 'primary.main' : 'text.secondary' }}
				/>
			</ListItemButton>
			<ListItemButton onClick={() => {
					navigate('/transfer')
				}}>
				<ListItemIcon sx={{ color: pathName === "/transfer" ? 'primary.main' : 'text.secondary' }}>
					<TransferWithinAStationIcon />
				</ListItemIcon>
				<ListItemText
					primary="Transfer"
					sx={{ color: pathName === "/transfer" ? 'primary.main' : 'text.secondary' }}
				/>
			</ListItemButton>
			<ListItemButton  onClick={() => {
					navigate('/update')
				}}>
				<ListItemIcon sx={{ color: pathName === "/update" ? 'primary.main' : 'text.secondary' }}>
					<AccountBoxIcon />
				</ListItemIcon>
				<ListItemText
					primary="Update Profile Details"
					sx={{ color: pathName === "/update" ? 'primary.main' : 'text.secondary' }}
				/>
			</ListItemButton>
		</List>
	)
}

export default SideBar
