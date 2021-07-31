import { Link, useHistory } from "react-router-dom";
import React from "react";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "./AuthContext";

export default function AuthButton() {
  const history = useHistory();
  const auth = useAuth();

  return (
    <Nav>
      {auth.user ? (
        <Nav.Link
          href="#"
          onSelect={() => {
            auth.signout(() => history.push("/login"));
          }}
        >
          Sign out
        </Nav.Link>
      ) : (
        <Nav.Link as={Link} to="/login">
          Sign in
        </Nav.Link>
      )}
    </Nav>
  );
}
