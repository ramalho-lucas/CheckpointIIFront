import LoginForm from "../Components/LoginForm";
import { AuthContext } from "../contexts/auth-context";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Contact = () => {
  const stsLogin = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('ctd_token') != null){
      <Navigate to={"/"}/>
    }
  }, [])

  console.log(stsLogin);

  return (
    <>
      <h1>Login</h1>
      <LoginForm />
    </>
  );
};

export default Contact;
