import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "./auth";
import { useFormik } from "formik";
import UserService from "../services/UserService";
import ConvertService from "../services/ConvertService";
import CircularProgressWithLabel from "./CircularStatic";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

export function ConvertPage() {
  const [isFirstLoggedIn, setIsFirstLoggedIn] = useState(localStorage.getItem("isFirstLoggedIn"));
  const { auth } = useAuth();
  const username = auth?.username;
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

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    onDrop: (acceptedFiles) => formik.setFieldValue("fileInput", acceptedFiles),
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

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
        for (const file of values.fileInput) {
          ConvertService.convert(file, values.imageFormat, values.singleOrMultiple, values.colorType, values.dpi, values.username)
            .then((res) => {
              alert(res.data);
            })
            .catch((e) => console.log(e.response.data));
        }

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
            <div className="col-md-6 mt-3">
              <h2>PDF to Image Converter</h2>
              <p>Warning: This process can take up to a minute depending on file-size</p>
              <form onSubmit={formik.handleSubmit}>
                <section className="container">
                  <div {...getRootProps({ className: "dropzone border border-2 border-secondary rounded p-5 text-center" })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <em>(Only *.pdf file will be accepted)</em>
                  </div>
                  <aside>
                    <p>Accepted files</p>
                    <ul>{acceptedFileItems}</ul>
                    <p>Rejected files</p>
                    <ul>{fileRejectionItems}</ul>
                  </aside>
                </section>
                <div className="form-group mb-2">
                  <label>Image Format</label>
                  <select {...formik.getFieldProps("imageFormat")} className="form-control" name="imageFormat">
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="gif">GIF</option>
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label>Image result type</label>
                  <select {...formik.getFieldProps("singleOrMultiple")} className="form-control" name="singleOrMultiple">
                    <option value="single">Single Big Image</option>
                    <option value="multiple">Multiple Images</option>
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label>Colour type</label>
                  <select {...formik.getFieldProps("colorType")} className="form-control" name="colorType">
                    <option value="color">Colour</option>
                    <option value="greyscale">Greyscale</option>
                    <option value="blackwhite">Black and White (May lose data!)</option>
                  </select>
                </div>
                <div className="form-group mb-3">
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
