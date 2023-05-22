import React, {useEffect, useState} from "react";
import {useAuth} from "./auth";
import PaymentService from "../services/PaymentService";
import OrchestraService from "../services/OrchestraService";
import ConvertIcon from "./convertIcon.svg";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay-ts";
import {useFile} from "./convert";

export function PaymentPage() {
  const [isFirstLoggedIn, setIsFirstLoggedIn] = useState(
    localStorage.getItem("isFirstLoggedIn")
  );
  const { auth, updateRoles } = useAuth();
  const username = auth?.username;
  const isPremium = auth?.roles[0] === "PREMIUM_USER";
  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const { file, deleteFile } = useFile();
  const [isConvertOrchestra, setIsConvertOrchestra] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    document.title = "I Love LAW - Go Premium";
    const api = async () => {
      if (file?.isOrchestra) {
        setIsConvertOrchestra(file?.isOrchestra);
        const data = {
          fileInput: file?.fileInput,
          imageFormat: file?.imageFormat,
          singleOrMultiple: file?.singleOrMultiple,
          colorType: file?.colorType,
          dpi: file?.dpi,
          username: file?.username,
        };
        setData(data);
        deleteFile();
      }
    };

    api();
  }, [file, deleteFile]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en", options).format(date);
  }

  const submitPayment = async () => {
    await swal({
      title: "Warning!",
      text: `Upgrade to premium for user '${username}'?`,
      icon: "warning",
      buttons: ["Cancel", "Yes"],
      dangerMode: false,
    }).then(async (ubah) => {
      if (ubah) {
        setLoading(true);
        if (isConvertOrchestra) {
          try {
            setLoadingText("Upgrading your membership and Convert PDFs ...");
            OrchestraService.orchestraConvert(data);
            setTimeout(async () => {
              setLoading(false);
              await swal({
                title: "Success!",
                text: "You are now a Premium user of ilovelaw!",
                icon: "success",
                buttons: [false, "Close"],
              });
              updateRoles(["PREMIUM_USER"]);

              window.location.href = "/history";
            }, 3000);
          } catch (error) {
            setLoading(false);
            console.log(error.response);
            await swal({
              title: "Failed!",
              text: "Failed to upgrade your membership and Convert PDFs",
              icon: "warning",
              buttons: [false, "Close"],
            });
          }
        } else {
          try {
            setLoadingText("Upgrading your membership ...");
            OrchestraService.orchestra(data);
            setTimeout(async () => {
              setLoading(false);
              await swal({
                title: "Success!",
                text: "You are now a Premium user of ilovelaw!",
                icon: "success",
                buttons: [false, "Close"],
              });
              updateRoles(["PREMIUM_USER"]);
              window.location.reload();
            }, 3000);
          } catch (error) {
            setLoading(false);
            console.log(error.response);
            await swal({
              title: "Failed!",
              text: "Failed to upgrade your membership and Convert PDFs",
              icon: "warning",
              buttons: [false, "Close"],
            });
          }
        }
      }
    });
  };

  useEffect(() => {
    if (isPremium) {
      const api = async () => {
        setPayment((await PaymentService.getPayment(username)).data);
      };
      api();
    }
  }, [isPremium, username]);

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

  return (
    <LoadingOverlay
      className="h-100"
      active={loading}
      spinner
      text={loadingText}
    >
      <section id="section" className="container">
        <div className="payment-page">
          <div className="payment-header">
            <div className="payment-header-title">
              <h2 style={{ fontWeight: 700 }} className="pt-5">
                Premium ilovelaw
              </h2>
            </div>
          </div>

          <div className="container">
            <div className="row pt-4">
              <div className="col-6 d-flex align-items-center justify-content-center">
                <div style={{ width: "260px" }}>
                  <div className="d-flex justify-content-center p-2">
                    <h3 className="text-center" style={{ fontWeight: 700 }}>
                      Why go Premium?
                    </h3>
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <div className="d-inline-flex pt-4 pb-2 justify-content-center">
                      <img
                        style={{ width: "150px", height: "150px" }}
                        src={ConvertIcon}
                        alt="premium-logo"
                      />
                    </div>
                    <div className="flex-column d-inline-flex p-2">
                      <h4
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Unlimited Converts
                      </h4>
                      <p className="text-center">
                        Convert PDFs as much as you want with no limit
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex col-1 justify-content-center">
                <div className="vr"></div>
              </div>

              {!isPremium && (
                <div className="col-4">
                  <div className="header">
                    <h4>Summary</h4>
                  </div>

                  <div className="p-4">
                    <div className="d-flex justify-content-between">
                      <h6>Username</h6>
                      <p>{username}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h6>Validity period</h6>
                      <p>lifetime</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6>Total</h6>
                        <h6 style={{ fontWeight: 100 }}>one-time pay</h6>
                      </div>
                      <p>Rp. dummy</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={submitPayment}>
                      Pay
                    </button>
                  </div>
                </div>
              )}

              {isPremium && (
                <div className="col-4">
                  <div className="header">
                    <h4>You are a Premium user of ilovelaw</h4>
                    <text>
                      Plan includes : Unlimited Converts
                      <br />
                    </text>
                    {payment && (
                      <text>Date joined : {formatDate(payment.date)}</text>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </LoadingOverlay>
  );
}
