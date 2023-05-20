import React from 'react';
import {useEffect, useState} from "react";
import Alert from 'react-bootstrap/Alert';
import {useAuth} from "./auth";
import UserService from "../services/UserService";

export function HomePage() {
    const [isFirstLoggedIn, setIsFirstLoggedIn] = useState(localStorage.getItem("isFirstLoggedIn"));
    const {auth} = useAuth()
    const username = auth?.username
    const [user, setUser] = useState()

    useEffect(() => {
        if (isFirstLoggedIn) {
            const timeoutId = setTimeout(() => {
                localStorage.removeItem("isFirstLoggedIn")
                setIsFirstLoggedIn(false)
            }, 3000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isFirstLoggedIn]);

    useEffect(() => {
        const api = async () => {
            setUser((await UserService.getInfo(username)).data)
        }

        api()
    }, [username]);

    const handleClose = () => {
        localStorage.removeItem("isFirstLoggedIn")
        setIsFirstLoggedIn(false);
    };

    return (
        <>
            {isFirstLoggedIn && (
                <Alert variant="success" show={isFirstLoggedIn} onClose={handleClose} dismissible>
                    <strong>Login!</strong> Anda berhasil masuk ke sistem.
                </Alert>
            )}

            <section className='jumbotron justify-content-center' style={{backgroundColor: 'rgb(231 239 255)'}}>
                <div className="container">
                    <div className="row mx-5">
                        <div className="col-lg-6">
                            {user
                                ? <h2 className="mt-5">Welcome to I love LAW, {user.name}!</h2>
                                : <h2 className="mt-5">Welcome to I love LAW!</h2>}
                            <h4 className="mb-5 text-black-50">Website Convert PDFs to JPG.</h4>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <br/>
                    <h2 style={{color: '#283770'}}>Feature I Love LAW</h2>
                    <br/>
                </div>

                <div className="container text-center mb-3">
                    <div className="row justify-content-around mt-2">
                        <div className="col-lg-4 col-sm-6 d-flex justify-content-center mb-3">
                            <div className="card mx-auto" style={{borderColor: '#283770', maxWidth: "18rem"}}>
                                <div className="card-header text-center text-white" style={{backgroundColor: '#283770'}}>
                                    Convert PDFs
                                </div>
                                <div className="card-body text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor"
                                         className="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
                                        <path
                                            d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                        <path
                                            d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/>
                                    </svg>
                                    <p className="card-text my-3">Convert Your PDFs to JPG Images in a Zip File.</p>
                                    <a href="/convert" className="btn btn-sm btn-outline-blue">Go To Page</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 d-flex justify-content-center mb-3">
                            <div className="card mx-auto" style={{borderColor: '#283770', maxWidth: "18rem"}}>
                                <div className="card-header text-center text-white" style={{backgroundColor: '#283770'}}>
                                    History Convert
                                </div>
                                <div className="card-body text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor"
                                         className="bi bi-clock-history" viewBox="0 0 16 16">
                                        <path
                                            d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                                        <path
                                            d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                    <p className="card-text my-3">The Complete List of Your PDFs to JPG Conversions.</p>
                                    <a href="/history" className="btn btn-sm btn-outline-blue">Go To Page</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 d-flex justify-content-center mb-3">
                            <div className="card mx-auto" style={{borderColor: '#283770', maxWidth: "18rem"}}>
                                <div className="card-header text-center text-white" style={{backgroundColor: '#283770'}}>
                                    Notification Convert
                                </div>
                                <div className="card-body text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor"
                                         className="bi bi-bell" viewBox="0 0 16 16">
                                        <path
                                            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                    </svg>
                                    <p className="card-text my-3">The Notification of Your PDFs to JPG Conversions.</p>
                                    <a href="/notification" className="btn btn-sm btn-outline-blue">Go To Page</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );

}
