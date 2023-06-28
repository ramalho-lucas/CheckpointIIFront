import styles from "./Form.module.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/theme-context";
import { Snackbar, Alert } from "@mui/material";

const LoginForm = () => {
  const { saveEmail, saveToken, setEstadoLogin } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function logar() {
    try {
      const response = await api.post("/auth", {
        username: email,
        password: password,
      });
      console.log(response.data);
      saveEmail(email);
      saveToken(response.data.token);
      setEstadoLogin("Logout");
      navigate("/");
    } catch (error) {
      setOpen(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    logar();
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Usuário ou senha incorretos, verifique.
        </Alert>
      </Snackbar>
      <div
        className={`text-center ${
          theme == "dark" ? "dark" : ""
        } card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
