import React from "react";
import { useState } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const Welcome = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const register = () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((cred) => {
        console.log("User Created: ", cred.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const login = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((cred) => {
        console.log("User Logged In: ", cred.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User Signed Out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  onAuthStateChanged(auth,(user) => {
    console.log('User Status Changed: ',user)
})
  return (
    <>
      <div>
        <h3>Register User</h3>
        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
      <div>
        <h3>Login</h3>
        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
      </div>
      <button onClick={logout}>Sign Out</button>
    </>
  );
};

export default Welcome;
