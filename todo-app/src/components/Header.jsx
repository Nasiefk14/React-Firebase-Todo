import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { setSignOutState, selectUserPhoto } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

import "./Header.css";

function Header() {
  const profilePic = useSelector(selectUserPhoto);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOutState());
    });
  };

  return (
    <div className="mainHeader">
      <div className="headerTitle">My Todo App</div>
      <div className="profilePic">
        <img src={profilePic} className="displayImage" onClick={signOut} alt='Logout Here'/>
      </div>
    </div>
  );
}

export default Header;
