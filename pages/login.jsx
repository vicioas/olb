import { React, useState } from 'react'
import {
	IconButton,
	InputAdornment,
	Typography,
	Container,
	Box,
	Link,
	TextField,
	CssBaseline,
	Button,
	Snackbar,
	Alert,
	CircularProgress,
} from '@mui/material'


import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../redux/userSlice'
import { setAllTokens } from '../redux/tokenSlice'

import bcrypt from 'bcryptjs'
import { useEffect } from 'react'
/* eslint-disable import/first */
var md5 = require('md5');

import { refreshTokenApi } from '../utils/api'
import { Error } from '../components/error'

export default function LoginPage() {
	let navigate = useNavigate()
	const { state } = useLocation()
	const dispatch = useDispatch()
	const refreshToken = useSelector((state) => state.tokenDetails.refreshToken)

	const [seePwd, setSeePwd] = useState('false')
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')
	const [loading, setLoading] = useState(false)

	const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)

	const handleClose = () => {
		setOpenSuccessSnackbar(false)
	}

	const putUnameInState = (event) => {
		setUserName(event.target.value)
	}

	const putPwdInState = (event) => {
		setPassword(event.target.value)
	}

	const storeUserData = async (data) => {
		dispatch(
			setUserDetails({
				id: data.id,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				ssn: data.ssn,
				address: data.address,
				dob: data.dob,
				gender: data.gender,
			})
		)
	}

	const getUserDetails = async (userId, authToken) => {
		axios
			.get(`http://localhost:8080/api/v1/user/${userId}`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then(({ data }) => {
				storeUserData(data)
			})
	}

	useEffect(() => {
		if (state?.status === 'SUCCESS') {
			setOpenSuccessSnackbar(true)
		}
	}, [])

	const handleSubmit = (event) => {
		setLoading(true)

		event.preventDefault()
		axios
			.post(
				`http://localhost:8080/api/login`,
				{ email: userName, password: md5(password) },
				// { email: userName, password },
				{ headers: { 'Access-Control-Allow-Origin': '*' } }
			)
			.then((response) => {
				if (response.status === 200) {
					dispatch(
						setAllTokens({
							authToken: response.data.access_token,
							refreshToken: response.data.refresh_token,
						})
					)
					getUserDetails(response.data.id, response.data.access_token)
					setLoading(false)
					navigate('/home')
				}
			})
			.catch((error) => {
				// if (error.response.status === 403) {
				// 	refreshTokenApi(refreshToken)
				// 	setLoginError('Please try again.')
				// } else {
				// 	setLoginError('Either username or password is incorrect.')
				// }
				setLoginError('Either username or password is incorrect.')
				setLoading(false)
			})
	}
	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<img
						src="ncr-logo-alternate.png"
						alt="ncr-logo-alternate"
						style={{ width: '150px', marginBottom: '40px' }}
					/>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="E-mail"
							name="email"
							autoComplete="email"
							variant="outlined"
							autoFocus
							color="primary"
							value={userName}
							onChange={(e) => {
								putUnameInState(e)
							}}
							sx={{
								'& .MuiInputLabel-root': { color: 'white' },
								'& .MuiOutlinedInput-root': {
									'& > fieldset': { borderColor: 'white' },
								},
							}}
						/>
						<TextField
							data-testid="password"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={!seePwd ? 'text' : 'password'}
							id="password"
							autoComplete="current-password"
							color="primary"
							value={password}
							onChange={(e) => {
								putPwdInState(e)
							}}
							sx={{
								'& .MuiInputLabel-root': { color: 'white' },
								'& .MuiOutlinedInput-root': {
									'& > fieldset': { borderColor: 'white' },
								},
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => {
												setSeePwd(!seePwd)
											}}
										>
											{!seePwd ? (
												<VisibilityOffIcon color="secondary" />
											) : (
												<VisibilityIcon color="secondary" />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<Button
							data-testid="button"
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Box>
							<Link href="/register" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
							<Error text={loginError} />
						</Box>
					</Box>
					{loading ? <CircularProgress /> : null}
				</Box>
			</Container>
			<Snackbar
				open={openSuccessSnackbar}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{ width: '100%' }}
				>
					Registered successfully! Please login.
				</Alert>
			</Snackbar>

			
		</>
	)
}
