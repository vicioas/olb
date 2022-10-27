import React, { useState } from 'react'
import '../App.css'
import {
	Button,
	CssBaseline,
	TextField,
	Link,
	Box,
	Container,
	Typography,
	MenuItem,
} from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import moment from 'moment'
import bcrypt from 'bcryptjs'
import 'yup-phone-lite'
import { useNavigate } from 'react-router-dom'
import { Error } from '../components/error'
var md5 = require('md5');

const initialValues = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	phone: '',
	ssn: '',
	address: '',
	gender: '',
	dob: '',
}

const validationSchema = Yup.object({
	firstName: Yup.string().required('Required'),
	lastName: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email').required('Email required'),
	password: Yup.string()
		.min(8, 'Password too short.')
		.max(15, 'Enter a smaller password.')
		.required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Please retype password'),
	phone: Yup.string()
		.phone('IN', 'Please enter a valid phone number')
		.required('Required'),
	ssn: Yup.string().required('Required'),
	address: Yup.string().required('Required'),
	dob: Yup.date().required('Enter Date of Birth'),
})

const Registration = () => {
	const [registerError, setRegisterError] = useState('')
	let currentDate = new Date()
	let navigate = useNavigate()
	
	const onSubmit = (values) => {
		let { confirmPassword,...finalValues }=values
		// delete finalValues.confirmPassword
		finalValues.password = md5(finalValues.password);

		axios
			.post('http://localhost:8080/api/v1/user', finalValues)
			.then((response) => {
				if (response.status === 200 || response.status === 201 ) {
					navigate('/login', { state: { status: 'SUCCESS' } })
				}
			})
			.catch((error) => {
				setRegisterError(
					error.response.data.message
				)
			})
	}

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	})

	return (
		<>
			<Container component="main" maxWidth="sm" disableGutters={true}>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						marginBottom: 90,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
					style={{ marginRight: '15px', marginLeft: '15px' }}
				>
					<img
						src="ncr-logo-alternate.png"
						alt="ncr-logo-alternate"
						style={{ width: '150px', marginBottom: '40px' }}
					/>
					<Typography component="h1" variant="h5">
						Registration
					</Typography>
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<Box
							sx={{
								marginTop: 8,
								//marginRight:5,
								display: 'flex',
								flexDirection: 'row',
								//alignItems: 'center',
							}}
						>
							<TextField
								error={
									formik.errors.firstName &&
									formik.touched.firstName
								}
								helperText={
									formik.errors.firstName &&
										formik.touched.firstName
										? formik.errors.firstName
										: null
								}
								margin="normal"
								required
								fullWidth
								autoFocus
								name="firstName"
								label="First Name"
								type="text"
								id="firstName"
								autoComplete="First Name"
								color="primary"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								sx={{
									'& .MuiInputLabel-root': {
										color: 'white',
									},
									'& .MuiOutlinedInput-root': {
										'& > fieldset': {
											borderColor: 'white',
										},
									},
								}}
								style={{ marginRight: '10px' }}
								value={formik.values.firstName}
							/>

							<TextField
								error={
									formik.errors.lastName &&
									formik.touched.lastName
								}
								helperText={
									formik.errors.lastName &&
										formik.touched.lastName
										? formik.errors.lastName
										: null
								}
								margin="normal"
								required
								fullWidth
								name="lastName"
								label="Last Name"
								type="text"
								id="lastName"
								autoComplete="Last Name"
								color="primary"
								sx={{
									'& .MuiInputLabel-root': {
										color: 'white',
									},
									'& .MuiOutlinedInput-root': {
										'& > fieldset': {
											borderColor: 'white',
										},
									},
								}}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.lastName}
							/>
						</Box>

						<TextField
							error={formik.errors.email && formik.touched.email}
							helperText={
								formik.errors.email && formik.touched.email
									? formik.errors.email
									: null
							}
							margin="normal"
							required
							fullWidth
							id="email"
							label="E-mail"
							name="email"
							autoComplete="email"
							variant="outlined"
							color="primary"
							sx={{
								'& .MuiInputLabel-root': { color: 'white' },
								'& .MuiOutlinedInput-root': {
									'& > fieldset': { borderColor: 'white' },
								},
							}}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							<TextField
								error={
									formik.errors.password &&
									formik.touched.password
								}
								helperText={
									formik.errors.password &&
										formik.touched.password
										? formik.errors.password
										: null
								}
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								color="primary"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.password}
								sx={{
									'& .MuiInputLabel-root': { color: 'white' },
									'& .MuiOutlinedInput-root': {
										'& > fieldset': {
											borderColor: 'white',
										},
									},
								}}
								style={{
									marginRight: '10px',
								}}
							/>
							<TextField
								error={
									formik.errors.confirmPassword &&
									formik.touched.confirmPassword
								}
								helperText={
									formik.errors.confirmPassword &&
										formik.touched.confirmPassword
										? formik.errors.confirmPassword
										: null
								}
								margin="normal"
								required
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="confirmPassword"
								autoComplete="current-password"
								color="primary"
								onChange={formik.handleChange}
								value={formik.values.confirmPassword}
								sx={{
									'& .MuiInputLabel-root': { color: 'white' },
									'& .MuiOutlinedInput-root': {
										'& > fieldset': {
											borderColor: 'white',
										},
									},
								}}
								onBlur={formik.handleBlur}
							/>
						</Box>

						<TextField
							error={formik.errors.phone && formik.touched.phone}
							helperText={
								formik.errors.phone && formik.touched.phone
									? formik.errors.phone
									: null
							}
							margin="normal"
							required
							fullWidth
							name="phone"
							label="Phone Number"
							type="text"
							id="phone"
							autoComplete="Phone Number"
							color="primary"
							sx={{
								'& .MuiInputLabel-root': { color: 'white' },
								'& .MuiOutlinedInput-root': {
									'& > fieldset': { borderColor: 'white' },
								},
							}}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.phone}
						/>
						<TextField
							error={formik.errors.ssn && formik.touched.ssn}
							helperText={
								formik.errors.ssn && formik.touched.ssn
									? formik.errors.ssn
									: null
							}
							margin="normal"
							required
							fullWidth
							name="ssn"
							label="SSN"
							type="text"
							id="ssn"
							autoComplete="SSN"
							color="primary"
							sx={{
								'& .MuiInputLabel-root': { color: 'white' },
								'& .MuiOutlinedInput-root': {
									'& > fieldset': { borderColor: 'white' },
								},
							}}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.ssn}
						/>

						<TextField
							error={
								formik.errors.address && formik.touched.address
							}
							helperText={
								formik.errors.address && formik.touched.address
									? formik.errors.address
									: null
							}
							margin="normal"
							required
							fullWidth
							multiline
							name="address"
							label="Address"
							type="text"
							id="address"
							autoComplete="Address"
							color="primary"
							sx={{
								'& .MuiInputLabel-root': { color: 'white' },
								'& .MuiOutlinedInput-root': {
									'& > fieldset': { borderColor: 'white' },
								},
							}}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.address}
						/>

						<Box
							sx={{
								marginTop: 2,
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							<TextField
								id="gender"
								label="Gender"
								name="gender"
								fullWidth
								select
								margin="normal"
								sx={{
									'& .MuiInputLabel-root': { color: 'white' },
									'& .MuiOutlinedInput-root': {
										'& > fieldset': {
											borderColor: 'white',
										},
									},
								}}
								onBlur={formik.handleBlur}
								style={{ marginRight: '10px' }}
								onChange={formik.handleChange}
								value={formik.values.gender}
							>
								<MenuItem value={'male'}>Male</MenuItem>
								<MenuItem value={'female'}>Female</MenuItem>
							</TextField>

							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									label="Date of Birth"
									id="dob"
									name="dob"
									type="date"
									openTo="year"
									minDate={currentDate.setFullYear(
										currentDate.getFullYear() - 100
									)}
									maxDate={new Date('2003-12-31')}
									onChange={(value) =>
										formik.setFieldValue(
											'dob',
											moment(value).format('YYYY-MM-DD'),
											true
										)
									}
									value={formik.values.dob}
									renderInput={(params) => (
										<TextField
											error={
												formik.errors.dob &&
												formik.touched.dob
											}
											helperText={
												formik.errors.dob &&
													formik.touched.dob
													? formik.errors.dob
													: null
											}
											{...params}
											fullWidth
											margin="normal"
											sx={{
												svg: { color: 'white' },
												'& .MuiInputLabel-root': {
													color: 'white',
												},
												'& .MuiOutlinedInput-root': {
													'& > fieldset': {
														borderColor: 'white',
													},
												},
											}}
										/>
									)}
								/>
							</LocalizationProvider>
						</Box>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={formik.handleSubmit}
							sx={{ mt: 3, mb: 2 }}
							disabled={Object.entries(formik.errors).length ? true:false}
							
						>
							Sign Up
						</Button>
						<Box>
							<Link href="/login" variant="body2">
								{'Have an account? Log in'}
							</Link>
							<Error text={registerError} />
						</Box>

					</Box>
				</Box>
			</Container>
		</>
	)
}
export default Registration
