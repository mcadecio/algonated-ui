import { useHistory, useLocation } from "react-router-dom";
import React from "react";
import { useAuth } from "../../auth/AuthContext";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const { from } = location.state || { from: { pathname: "/" } };
  const login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page</p>
      <LoginForm login={login} />
    </div>
  );
}
