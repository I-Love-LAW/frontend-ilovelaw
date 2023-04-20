/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from "react-router-dom";
import {useFormik} from 'formik'
import UserService from "../../services/UserService";

const initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    changepassword: '',
    acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('First Name is required'),
    lastname: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Last Name is required'),
    username: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Username is required'),
    email: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
    password: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Password is required'),
    changepassword: Yup.string()
        .required('Password confirmation is required')
        .when('password', {
            is: (val: string) => (!!(val && val.length > 0)),
            then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
        }),
    acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

const RegistrationPage = () => {
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            try {
                await UserService.register(
                    values.username,
                    values.nama,
                    values.password
                )
                await UserService.login(values.username, values.password)
                document.location.reload()
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
                     height: "300px"
                 }}></div>

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
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input type="text" id="form3Example1" className="form-control" />
                                            <label className="form-label" htmlFor="form3Example1">First name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input type="text" id="form3Example2" className="form-control" />
                                            <label className="form-label" htmlFor="form3Example2">Last name</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control" />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="form3Example4" className="form-control" />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                <div className="form-check d-flex justify-content-center mb-4">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                                    <label className="form-check-label" htmlFor="form2Example33">
                                        Subscribe to our newsletter
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Sign up
                                </button>

                                <div className="text-center">
                                    <p>or sign up with:</p>
                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-facebook-f"></i>
                                    </button>

                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-google"></i>
                                    </button>

                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-twitter"></i>
                                    </button>

                                    <button type="button" className="btn btn-link btn-floating mx-1">
                                        <i className="fab fa-github"></i>
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