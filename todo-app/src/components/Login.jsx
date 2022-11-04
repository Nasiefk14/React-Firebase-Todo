import { provider, auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  setUserLoginDetails,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  const navigate = useNavigate();
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
        console.log(res);
        navigate("/Todos");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        id: user.uid
      })
    );
  };

  return (
    <>
      {!username ? <button onClick={handleAuth}>Login</button> : <></>}

      <button>Sign Out</button>
    </>
  );
};

export default Login;
