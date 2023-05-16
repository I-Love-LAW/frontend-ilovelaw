/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import UserService from "../../services/UserService";
import { useAuth } from '.'

const initialValues = {
    name: '',
    username: '',
    password: '',
    changepassword: ''
}

const registrationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Name is required'),
    username: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(20, 'Maximum 20 symbols')
        .required('Username is required'),
    password: Yup.string()
        .min(6, 'Minimum 6 symbols')
        .max(40, 'Maximum 40 symbols')
        .required('Password is required'),
    changepassword: Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
})

const RegistrationPage = () => {
    const [loading, setLoading] = useState(false)
    const {saveAuth} = useAuth()

    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            try {
                await UserService.register(
                    values.username,
                    values.name,
                    values.password
                )
                const {data: authData} = await UserService.login(values.username, values.password)
                saveAuth(authData)
            } catch (error) {
                console.error(error)
                setStatus('The registration details is incorrect')
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    return (
        <section className="text-center">
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
                            <h2 className="fw-bold mb-5">Sign up now</h2>
                            <form
                                onSubmit={formik.handleSubmit}
                                noValidate
                                id='kt_login_signin_form'>

                                {formik.status && (
                                    <div className='mb-lg-15 alert alert-danger'>
                                        <div className='alert-text font-weight-bold'>{formik.status}</div>
                                    </div>
                                )}

                                <div className="row mb-3">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <div className='fv-row mb-10'>
                                                <div className='d-flex justify-content-between mt-n5'>
                                                    <div className='d-flex flex-stack mb-2'>
                                                        {/* begin::Label */}
                                                        <label className='form-label fw-bold text-dark fs-6 mb-0'>Name</label>
                                                        {/* end::Label */}
                                                    </div>
                                                </div>
                                                <input
                                                    placeholder='Name'
                                                    {...formik.getFieldProps('name')}
                                                    className={clsx(
                                                        'form-control bg-transparent',
                                                        {'is-invalid': formik.touched.name && formik.errors.name},
                                                        {'is-valid': formik.touched.name && !formik.errors.name}
                                                    )}
                                                    type='text'
                                                    autoComplete='off'
                                                />
                                                {formik.touched.name && formik.errors.name && (
                                                    <div className='fv-plugins-message-container'>
                                                        <div className='fv-help-block'>
                                                            <span role='alert'>{formik.errors.name}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <div className='fv-row mb-10'>
                                                <div className='d-flex justify-content-between mt-n5'>
                                                    <div className='d-flex flex-stack mb-2'>
                                                        {/* begin::Label */}
                                                        <label className='form-label fw-bold text-dark fs-6 mb-0'>Username</label>
                                                        {/* end::Label */}
                                                    </div>
                                                </div>
                                                <input
                                                    placeholder='Username'
                                                    {...formik.getFieldProps('username')}
                                                    className={clsx(
                                                        'form-control bg-transparent',
                                                        {'is-invalid': formik.touched.username && formik.errors.username},
                                                        {'is-valid': formik.touched.username && !formik.errors.username}
                                                    )}
                                                    type='text'
                                                    autoComplete='off'
                                                />
                                                {formik.touched.username && formik.errors.username && (
                                                    <div className='fv-plugins-message-container'>
                                                        <div className='fv-help-block'>
                                                            <span role='alert'>{formik.errors.username}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <div className='fv-row mb-10'>
                                                <div className='d-flex justify-content-between mt-n5'>
                                                    <div className='d-flex flex-stack mb-2'>
                                                        {/* begin::Label */}
                                                        <label className='form-label fw-bold text-dark fs-6 mb-0'>Password</label>
                                                        {/* end::Label */}
                                                    </div>
                                                </div>
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
                                                            <span role='alert'>{formik.errors.password}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <div className='fv-row mb-10'>
                                                <div className='d-flex justify-content-between mt-n5'>
                                                    <div className='d-flex flex-stack mb-2'>
                                                        {/* begin::Label */}
                                                        <label className='form-label fw-bold text-dark fs-6 mb-0'>Password Confirmation</label>
                                                        {/* end::Label */}
                                                    </div>
                                                </div>
                                                <input
                                                    type='password'
                                                    placeholder='Password confirmation'
                                                    autoComplete='off'
                                                    {...formik.getFieldProps('changepassword')}
                                                    className={clsx(
                                                        'form-control bg-transparent',
                                                        {'is-invalid': formik.touched.changepassword && formik.errors.changepassword},
                                                        {'is-valid': formik.touched.changepassword && !formik.errors.changepassword}
                                                    )}
                                                />
                                                {formik.touched.changepassword && formik.errors.changepassword && (
                                                    <div className='fv-plugins-message-container'>
                                                        <div className='fv-help-block'>
                                                            <span role='alert'>{formik.errors.changepassword}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='d-grid mb-10 mt-5'>
                                    <button
                                        type='submit'
                                        id='kt_sign_in_submit'
                                        className='btn btn-primary'
                                        disabled={formik.isSubmitting || !formik.isValid}
                                    >
                                        {!loading && <span className='indicator-label'>Register</span>}
                                        {loading && (
                                            <span className='indicator-progress' style={{display: 'block'}}>
                                              Please wait...
                                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                            </span>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export {RegistrationPage}