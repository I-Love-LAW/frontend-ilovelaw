import React from "react";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "./auth";
import ConvertService from "../services/ConvertService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate, Link } from "react-router-dom";
import { HiDownload } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";
import WithLabelExample from "./ProgressBar";

export function HistoryPage() {
  const [isFirstLoggedIn, setIsFirstLoggedIn] = useState(localStorage.getItem("isFirstLoggedIn"));
  const { auth } = useAuth();
  const username = auth?.username;
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [filename, setFilename] = useState(null);
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(null);

  const showDeleteModal = (id, filename) => {
    setDeleteMessage(`Are you sure you want to delete ${filename}?`);
    setFilename(filename);
    setId(id);
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = async (filename, id) => {
    const api = async () => {
      const response = await ConvertService.deleteHistory(id, username);
      if (response.status === 200) {
        setHistory(history.filter((entry) => entry.id !== id));
        setDeleteSuccessMessage(`File ${filename} deleted succesfully`);
        setDisplayConfirmationModal(false);
      } else if (response.status === 401) {
        alert("Your login session is over.\nFailed to delete file.");
        navigate("/auth");
      } else {
        alert("Failed to delete file.");
      }
    };

    api();
  };

  const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, name, message }) => {
    return (
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger">{message}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => confirmModal(name, id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
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
      setHistory((await ConvertService.getHistory(username)).data);
      setLoading(false);
    };

    api();
  }, [username]);

  return (
    <section className="container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="my-5">
            <h2>PDF to Image Convert History</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          {deleteSuccessMessage && <Alert variant="success">{deleteSuccessMessage}</Alert>}
          <table>
            <thead>
              <tr className="col justify-content-center">
                <th>File Name</th>
                <th className="text-center">Progress</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={3}>
                    <Box className="justify-content-center" sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  </td>
                </tr>
              )}
              {history !== undefined && !history.length && (
                <tr>
                  <td colSpan={3}>Tidak ada history untuk ditampilkan.</td>
                </tr>
              )}
              {history !== undefined &&
                history.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.filename}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        {entry.progress !== 1 && <WithLabelExample id={entry.id} />}
                        {entry.progress === 1 && <BsFillCheckCircleFill color="green" />}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        {entry.progress === 1 && (
                          <div className="pt-1">
                            <Link to={entry.result} key={entry.id} target="_blank">
                              <HiDownload size={18} />
                            </Link>
                          </div>
                        )}
                        <button className="btn btn-link" onClick={() => showDeleteModal(entry.id, entry.filename)}>
                          <RiDeleteBin6Line size={18} color="red" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} name={filename} id={id} message={deleteMessage} />
      </div>
    </section>
  );
}
