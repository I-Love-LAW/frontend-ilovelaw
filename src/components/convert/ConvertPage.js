import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { useFormik } from "formik";
import UserService from "../../services/UserService";
import ConvertService from "../../services/ConvertService";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useFile } from "./index";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay-ts";

export function ConvertPage() {
  const [isFirstLoggedIn, setIsFirstLoggedIn] = useState(
    localStorage.getItem("isFirstLoggedIn")
  );
  const { auth } = useAuth();
  const username = auth?.username;
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const navigate = useNavigate();
  const [canConvert, setCanConvert] = useState("false");
  const { saveFile } = useFile();

  const initialValues = {
    fileInput: null,
    imageFormat: "png",
    singleOrMultiple: "single",
    colorType: "color",
    dpi: "30",
    username: username,
  };

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
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
    document.title = "I Love LAW - Convert";
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
      const history = (await ConvertService.getHistory(username)).data;
      const totalHistory = history.length;
      const result = await UserService.getConvertEligibility(
        username,
        totalHistory
      );
      setCanConvert(result.data.canConvert.toString());
    };

    api();
  }, [username]);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      if (canConvert === "true") {
        try {
          setLoadingText("Sending files to Server");
          for (const file of values.fileInput) {
            ConvertService.convert(
              file,
              values.imageFormat,
              values.singleOrMultiple,
              values.colorType,
              values.dpi,
              values.username
            )
              .then(() => {})
              .catch((e) => console.log(e.response.data));
          }
          setLoading(false);
          await swal({
            title: "Success!",
            text: "The file is being converted!",
            icon: "success",
            buttons: [false, "Close"],
          });
          navigate("/history", { replace: true });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            setStatus("Sedih T_T");
          } else {
            setStatus("Terjadi kesalahan tak terduga, silahkan coba lagi");
          }
          setSubmitting(false);
          setLoading(false);
        }
      } else {
        await swal({
          title: "Warning!",
          text: "Akun Anda sudah melebihi batas konversi. Anda perlu update menjadi akun premium",
          icon: "warning",
          buttons: ["Tidak, Batalkan", "Ya, Lanjutkan"],
          dangerMode: true,
        }).then((ubah) => {
          if (ubah) {
            let dataFile = values;
            let fileURLList = {};
            for (const file of dataFile.fileInput) {
              fileURLList[file.name] = window.URL.createObjectURL(file);
            }
            dataFile["isOrchestra"] = true;
            dataFile["fileInput"] = fileURLList;
            saveFile(dataFile);

            navigate("/payment");
          }
        });
      }
    },
  });

  return (
    <LoadingOverlay
      className="h-100"
      active={loading}
      spinner
      text={loadingText}
    >
      <section id="section" className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-3">
            <h2>PDF to Image Converter</h2>
            <p>
              Warning: This process can take up to a minute depending on
              file-size
            </p>
            <form onSubmit={formik.handleSubmit}>
              <section className="container">
                <div
                  {...getRootProps({
                    className: `dropzone border border-2 border-secondary rounded p-5 text-center ${
                      isDragActive ? "bg-blue text-white" : ""
                    }`,
                    style: {
                      cursor: isDragActive ? "grabbing" : "pointer",
                    },
                  })}
                >
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
                <select
                  {...formik.getFieldProps("imageFormat")}
                  className="form-control"
                  name="imageFormat"
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="gif">GIF</option>
                </select>
              </div>
              <div className="form-group mb-2">
                <label>Image result type</label>
                <select
                  {...formik.getFieldProps("singleOrMultiple")}
                  className="form-control"
                  name="singleOrMultiple"
                >
                  <option value="single">Single Big Image</option>
                  <option value="multiple">Multiple Images</option>
                </select>
              </div>
              <div className="form-group mb-2">
                <label>Colour type</label>
                <select
                  {...formik.getFieldProps("colorType")}
                  className="form-control"
                  name="colorType"
                >
                  <option value="color">Colour</option>
                  <option value="greyscale">Greyscale</option>
                  <option value="blackwhite">
                    Black and White (May lose data!)
                  </option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="dpi">DPI:</label>
                <input
                  {...formik.getFieldProps("dpi")}
                  type="number"
                  name="dpi"
                  className="form-control"
                  id="dpi"
                  min="1"
                  max="100"
                  step="1"
                  required=""
                />
              </div>
              <div className="form-group" hidden>
                <label htmlFor="username">Username:</label>
                <input
                  {...formik.getFieldProps("username")}
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                />
              </div>
              <button type="submit" id="submitBtn" className="btn btn-primary">
                Convert
              </button>
            </form>
          </div>
        </div>
      </section>
    </LoadingOverlay>
  );
}
