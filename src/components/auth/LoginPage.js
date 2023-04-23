/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from "react-router-dom";
import {useFormik} from 'formik'
import UserService from "../../services/UserService";
import { useAuth } from '.'
import Alert from "react-bootstrap/Alert";

const loginSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Username is required'),
    password: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Password is required'),
})

const initialValues = {
    username: '',
    password: '',
}

export function LoginPage() {
    const [loading, setLoading] = useState(false)
    const {saveAuth} = useAuth()

    const [isFirstLoggedOut, setIsFirstLoggedOut] = useState(localStorage.getItem("isFirstLoggedOut"));

    useEffect(() => {
        if (isFirstLoggedOut) {
            const timeoutId = setTimeout(() => {
                localStorage.removeItem("isFirstLoggedOut")
                setIsFirstLoggedOut(false)
            }, 10000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isFirstLoggedOut]);

    const handleClose = () => {
        setIsFirstLoggedOut(false);
    };

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            try {
                const {data: authData} = await UserService.login(values.username, values.password)
                saveAuth(authData)
                localStorage.setItem("isFirstLoggedIn", true)
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setStatus('Username atau Password salah')
                } else {
                    setStatus('Terjadi kesalahan tak terduga, silahkan coba lagi')
                }
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    return (
        <section className="text-center">
            {isFirstLoggedOut && (
                <Alert className="text-start" variant="success" show={isFirstLoggedOut} onClose={handleClose} dismissible>
                    <strong>Logout!</strong> Anda berhasil keluar dari sistem.
                </Alert>
            )}

            <div className="p-5 bg-image"
                 style={{
                     backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
                     height: "200px"
                 }}>
            </div>

            <div className="card mx-4 mx-md-5 shadow-5-strong"
                 style={{
                     marginTop: "-100px",
                     background: "hsla(0, 0%, 100%, 0.8)",
                     backdropFilter: "blur(30px)"
                 }}>
                <div className="card-body py-5 px-md-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">Login</h2>
                            <form
                                onSubmit={formik.handleSubmit}
                                noValidate
                                id='kt_login_signin_form'>

                                {formik.status && (
                                    <div className='mb-lg-15 alert alert-danger'>
                                        <div className='alert-text font-weight-bold'>{formik.status}</div>
                                    </div>
                                )}

                                <div className="form-outline mb-4">
                                     <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
                                     <input
                                        placeholder='Username'
                                        {...formik.getFieldProps('username')}
                                        className={clsx(
                                            'form-control bg-transparent',
                                            {'is-invalid': formik.touched.username && formik.errors.username},
                                            {'is-valid': formik.touched.username && !formik.errors.username}
                                        )}
                                        type='text'
                                        name='username'
                                        autoComplete='off'
                                    />
                                    {formik.touched.username && formik.errors.username && (
                                        <div className='fv-plugins-message-container'>
                                            <span style={{color: "red"}} role='alert'>{formik.errors.username}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-outline mb-4">
                                    <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        autoComplete='off'
                                        {...formik.getFieldProps('password')}
                                        className={clsx(
                                            'form-control bg-transparent',
                                            {'is-invalid': formik.touched.password && formik.errors.password},
                                            {'is-valid': formik.touched.password && !formik.errors.password}
                                        )}
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <div className='fv-plugins-message-container'>
                                            <div className='fv-help-block'>
                                                <span style={{color: "red"}} role='alert'>{formik.errors.password}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className='d-grid mb-10 mt-5'>
                                    <button
                                        type='submit'
                                        id='kt_sign_in_submit'
                                        className='btn btn-primary'
                                        disabled={formik.isSubmitting || !formik.isValid}
                                    >
                                        {!loading && <span className='indicator-label'>Login</span>}
                                        {loading && (
                                            <span className='indicator-progress' style={{display: 'block'}}>
                                              Please wait...
                                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                            </span>
                                        )}
                                    </button>
                                </div>

                                <div className='text-gray-500 text-center fw-semibold fs-6 mt-1'>
                                    Not a Member yet?{' '}
                                    <Link to='/auth/registration' className='link-primary'>
                                        Sign up
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}