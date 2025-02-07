import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
    if (user && user.role !== "student") {
      navigate("/admin/companies");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
