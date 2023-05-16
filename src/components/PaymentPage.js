import React from "react";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "./auth";
import UserService from "../services/UserService";
import PaymentService from "../services/PaymentService";
import { useNavigate } from "react-router-dom";
import ConvertIcon from "./convertIcon.svg"
import swal from 'sweetalert'
import LoadingOverlay from 'react-loading-overlay-ts';

export function PaymentPage() {
  const [isFirstLoggedIn, setIsFirstLoggedIn] = useState(localStorage.getItem("isFirstLoggedIn"));
  const { auth } = useAuth();
  const username = auth?.username;
  const isPremium = auth?.roles == "PREMIUM_USER" ? true : false;
  const [user, setUser] = useState();
  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const navigate = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);
    
    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric', 
    };
    const formattedDate = new Intl.DateTimeFormat('en', options).format(date);
    return formattedDate;
  }

  const submitPayment = async () => {
    await swal({
        title: "Warning!",
        text: `Upgrade to premium for user '${username}'?`,
        icon: "warning",
        buttons: [
            "Cancel", "Yes"
        ],
        dangerMode: false,
    }).then(async (ubah) => {
        if (ubah) {
            try {
                setLoading(true);
                setLoadingText("Making payment ...");
                const payment = await PaymentService.makePayment(username);
                if (payment.status == 200) {
                    try {
                        setLoadingText("Upgrading your membership ...");
                        const upgrade = await UserService.upgradeMembership(username);
                        if (upgrade.status == 200) {
                            setLoading(false);
                            await swal({
                                title: "Success!",
                                text: "You are now a Premium user of ilovelaw!",
                                icon: "success",
                                buttons: [false, "Close"]
                            });
                            window.location.reload();
                            // window.location.href = "/new-page";
                        }
                    }
                    catch (error) {
                        setLoading(false);
                        console.log(error.response);
                        await swal({
                            title: "Failed!",
                            text: "Failed to upgrade your membership",
                            icon: "warning",
                            buttons: [false, "Close"],
                        });
                    }
                }
            }
            catch (error) {
                setLoading(false);
                console.log(error.response);
                await swal({
                    title: "Failed!",
                    text: "Failed to make payment",
                    icon: "warning",
                    buttons: [false, "Close"],
                });
            }
        }
    });
    }

    useEffect(() => {
        if (isPremium) {
            const api = async () => {
                setPayment((await PaymentService.getPayment(username)).data);
            };
            api();
        }
    }, [isPremium]);

  useEffect(() => {
    if (isFirstLoggedIn) {
      const timeoutId = setTimeout(() => {
        localStorage.removeItem("isFirstLoggedIn");
        setIsFirstLoggedIn(false);
      }, 10000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isFirstLoggedIn]);

  useEffect(() => {
    const api = async () => {
      setUser((await UserService.getInfo(username)).data);
    };

    api();
  }, [username]);

  const handleClose = () => {
    setIsFirstLoggedIn(false);
  };

  return (
    <LoadingOverlay
    className="h-100"
    active={loading}
    spinner
    text={loadingText}
    >
    <section className="container">
      {isFirstLoggedIn && (
        <Alert variant="success" show={isFirstLoggedIn} onClose={handleClose} dismissible>
          <strong>Login!</strong> Anda berhasil masuk ke sistem.
        </Alert>
      )}

    <div className="payment-page">
        <div className="payment-header">
            <div className="payment-header-title">
                <h2 style={{fontWeight: 700}} className="pt-5">Premium ilovelaw</h2>
            </div>
        </div>

        <div className='container'>
            <div className="row pt-4">
                <div className="col-6 d-flex align-items-center justify-content-center">
                    <div style={{width:"260px"}}>
                        <div className="d-flex justify-content-center p-2">
                            <h3 className="text-center" style={{fontWeight: 700}}>Why go Premium?</h3>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <div className="d-inline-flex pt-4 pb-2 justify-content-center">
                                <img style={{width:"150px", height:"150px"}} src={ConvertIcon}/>
                            </div>
                            <div className="flex-column d-inline-flex p-2">
                                <h4 className="text-center" style={{fontWeight: 'bold'}}>Unlimited Converts</h4>
                                <p className="text-center">Convert PDFs as much as you want with no limit</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex col-1 justify-content-center">
                    <div className="vr"></div>
                </div>

                {!isPremium &&
                <div className="col-4">
                    <div className="header">
                        <h4>Summary</h4>
                    </div>
                    
                    <div className="p-4">
                        <div className='d-flex justify-content-between'>
                            <h6>Username</h6>
                            <p>{username}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <h6>Validity period</h6>
                            <p>lifetime</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h6>Total</h6>
                                <h6 style={{fontWeight: 100}}>one-time pay</h6>
                            </div>
                            <p>Rp. dummy</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={submitPayment}>Pay</button>
                    </div>
                </div>}

                {isPremium &&
                <div className="col-4">
                    <div className="header">
                        <h4>You are a Premium user of ilovelaw</h4>
                        <text>Plan includes : Unlimited Converts<br/></text>
                        {payment && <text>Date joined : {formatDate(payment.date)}</text>}
                    </div>
                </div>}
            </div>
        </div>
    </div>
    </section>
    </LoadingOverlay>
  );
}
