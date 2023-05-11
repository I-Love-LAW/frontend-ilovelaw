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
import fileDownload from "js-file-download";

export function ConvertPage() {
  const [isFirstLoggedIn, setIsFirstLoggedIn] = useState(localStorage.getItem("isFirstLoggedIn"));
  const { auth } = useAuth();
  //   const username = auth?.username;
  const username = "ujang";
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    fileInput: null,
    imageFormat: "png",
    singleOrMultiple: "single",
    colorType: "color",
    dpi: "30",
    username: username,
  };

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

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        ConvertService.convert(values.fileInput, values.imageFormat, values.singleOrMultiple, values.colorType, values.dpi, values.username)
          .then((res) => {
            alert(res.data);
          })
          .catch((e) => console.log(e.response.data));

        const intervalId = setInterval(async () => {
          const { data: result } = await ConvertService.getLastHistory(username);
          setProgress(result.progress * 100);
          if (result.progress === 1) {
            clearInterval(intervalId);
            navigate("/history", { replace: true });
          }
        }, 200);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setStatus("Sedih T_T");
        } else {
          setStatus("Terjadi kesalahan tak terduga, silahkan coba lagi");
        }
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

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
          {!loading && (
            <div className="col-md-6">
              <h2>PDF to Image</h2>
              <p>Warning: This process can take up to a minute depending on file-size</p>
              <form onSubmit={formik.handleSubmit}>
                <div className="custom-file-chooser">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      name="fileInput"
                      id="fileInput-input"
                      accept="application/pdf"
                      multiple=""
                      onChange={(event) => {
                        formik.setFieldValue("fileInput", event.currentTarget.files[0]);
                      }}
                    />
                    <label className="custom-file-label" htmlFor="fileInput-input">
                      Select PDF(s)
                    </label>
                  </div>
                  <div className="selected-files"></div>
                </div>
                <br />
                <div id="progressBarContainer" style={{ display: "none", position: "relative" }}>
                  <div className="progress" style={{ height: "1rem" }}>
                    <div id="progressBar" className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ width: "0%" }}>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Image Format</label>
                  <select {...formik.getFieldProps("imageFormat")} className="form-control" name="imageFormat">
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="gif">GIF</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image result type</label>
                  <select {...formik.getFieldProps("singleOrMultiple")} className="form-control" name="singleOrMultiple">
                    <option value="single">Single Big Image</option>
                    <option value="multiple">Multiple Images</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Colour type</label>
                  <select {...formik.getFieldProps("colorType")} className="form-control" name="colorType">
                    <option value="color">Colour</option>
                    <option value="greyscale">Greyscale</option>
                    <option value="blackwhite">Black and White (May lose data!)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dpi">DPI:</label>
                  <input {...formik.getFieldProps("dpi")} type="number" name="dpi" className="form-control" id="dpi" min="1" max="100" step="1" required="" />
                </div>
                <div className="form-group" hidden>
                  <label htmlFor="username">Username:</label>
                  <input {...formik.getFieldProps("username")} type="text" name="username" className="form-control" id="username" />
                </div>
                <button type="submit" id="submitBtn" className="btn btn-primary">
                  Convert
                </button>
              </form>
            </div>
          )}

          {loading && <CircularProgressWithLabel value={parseFloat(progress)} />}
        </div>
      </div>
    </section>
  );
}
