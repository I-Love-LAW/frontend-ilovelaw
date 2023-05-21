import React, { useEffect, useState } from "react";
import { useAuth } from "./auth";
import ProgressBar from "react-bootstrap/ProgressBar";
import ConvertService from "../services/ConvertService";

function WithLabelExample(props) {
  const [progress, setProgress] = useState("");
  const { auth } = useAuth();
  const username = auth?.username;
  const id = props.id;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { data: result } = await ConvertService.getConvertHistoryById(username, id);
      setProgress(result * 100);
      if (result === 1) {
        clearInterval(intervalId);
      }
    }, 500);

    if (progress === 100) {
      clearInterval(intervalId);
      window.location.reload();
    }
  }, [progress, username, id]);

  return <ProgressBar className="w-75" now={progress} label={`${progress.toString().substring(0, 6)}%`} />;
}

export default WithLabelExample;
