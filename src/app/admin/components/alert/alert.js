// src/components/AlertComponent.js

import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// A reusable component for showing different types of alerts
const AlertComponent = ({ message, type }) => {
  const showToast = () => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "pending":
        toast.info(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  // Trigger the toast when the component mounts
  React.useEffect(() => {
    showToast();
  }, [message, type]);

  return null;
};

export default AlertComponent;
