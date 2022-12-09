import { provider, auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserLoginDetails } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AiOutlineGooglePlus } from "react-icons/ai";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
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
        id: user.uid,
      })
    );
  };

  return (
    <>
      <h1>My Todo App</h1>
      <div className="login">
        <h3 className="header">Login Here :</h3>
          <button onClick={handleAuth} className="button">
            <AiOutlineGooglePlus className="icons" />
            <p className="buttonText">Sign In WIth Google</p>
          </button>
      </div>
    </>
  );
};

export default Login;
