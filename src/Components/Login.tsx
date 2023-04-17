import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from "../store";
import {loginTC} from "../reducers/auth/authReducer";
import {Navigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {selectIsLoggedIn} from "../reducers/app/appSelector";


export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(3, 'Password cannot be less than 3 characters')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });

    const emailErrors = formik.touched.email && formik.errors.email
    const passwordErrors = formik.touched.password && formik.errors.password


    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <Paper style={{padding: '50px', marginTop: '50px', borderRadius: '10px', backgroundColor: '#f1eaea'}}>
                <FormControl>
                    <FormLabel style={{color: 'black'}}>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>

                            <TextField
                                label={emailErrors ? formik.errors.email : 'Email'}
                                margin="normal"
                                type="email"
                                // autoFocus
                                error={!!emailErrors}
                                {...formik.getFieldProps('email')}
                            />

                            <TextField
                                type="password"
                                label={passwordErrors ? formik.errors.password : 'Password'}
                                margin="normal"
                                error={!!passwordErrors}
                                {...formik.getFieldProps('password')}
                            />

                            <FormControlLabel label={'Remember me'}
                                              control={<Checkbox
                                                  checked={formik.values.rememberMe}
                                                  {...formik.getFieldProps('rememberMe')}
                                              />}/>
                            <Button type={'submit'} variant={'contained'} style={{backgroundColor: 'rgba(187,183,239,0.59)', color: 'black'}}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Paper>
        </Grid>
    </Grid>
}