import React from "react";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "./auth";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import UserService from "../services/UserService";
import ConvertService from "../services/ConvertService";
import CircularProgressWithLabel from "./CircularStatic";
import { useNavigate } from "react-router-dom";

export function HistoryPage() {
  const [isFirstLoggedIn, setIsFirstLoggedIn] = useState(localStorage.getItem("isFirstLoggedIn"));
  const { auth } = useAuth();
  //   const username = auth?.username;
  const username = "ujang";
  const [user, setUser] = useState();
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    const api = async () => {
      setHistory((await ConvertService.getHistory(username)).data);
      console.log(history);
    };

    api();
  }, []);

  const handleClose = () => {
    setIsFirstLoggedIn(false);
  };

  return (
    <section className="container">
      {isFirstLoggedIn && (
        <Alert variant="success" show={isFirstLoggedIn} onClose={handleClose} dismissible>
          <strong>Login!</strong> Anda berhasil masuk ke sistem.
        </Alert>
      )}

      {user && <h4>Selamat datang, {user.name}!</h4>}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-2">
            <h2>PDF to Image</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          {history !== undefined &&
            history.map((entry) => {
              return (
                <div className="col-md-2">
                  <p>{entry.id}</p>
                  <p>{entry.progress * 100}%</p>
                  <a href={entry.result}>Link Download</a>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
