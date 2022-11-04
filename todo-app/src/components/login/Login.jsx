import React from "react";
import { provider, auth } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const handleAuth = () => {
    signInWithPopup(auth, provider).then((res) => {
      console.log(res)
    }).catch((err) => {
      alert(err.message)
    })
  }
  return (
    <>
        <button onClick={handleAuth}>Login</button>
      <button>Sign Out</button>
    </>
  );
};

export default Login;
