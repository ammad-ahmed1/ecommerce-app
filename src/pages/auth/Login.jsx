import React, { useState } from "react";
import styles from "./auth.module.scss";
import Input from "../../components/shared/input/Input";
import { auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify"; // Import the toast library
import Loader from "../../components/shared/loader/Loader";
import { useNavigate } from "react-router-dom";
// import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  // const auth = getAuth();
  console.log(loc, "................loc");
  const [formData, setFormData] = useState({
    email: "",
    psw: "",
    isEmailEmpty: false,
    isPswEmpty: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEmailChange = (e) => {
    //setEmail(e.target.value);
    const { value } = e.target;
    setFormData({
      ...formData,
      email: value,
    });
  };

  const handlePswChange = (e) => {
    //setPsw(e.target.value);
    const { value } = e.target;
    setFormData({
      ...formData,
      psw: value,
    });
  };
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        return value.trim() !== "";
      case "email":
        // Add a more comprehensive email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "phNo":
        // Add a more comprehensive phone number validation
        return /^\d{10}$/.test(value);
      case "psw":
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
      case "gender":
        return value !== "";
      default:
        return false;
    }
  };

  const gmailLogin = () => {
    const res = signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const userData = {
          email: user?.email,
          userName: user?.userName,
          userID: user?.userID,
        };
        // dispatch(SET_ACTIVE_USER(userData));

        if (loc.includes("/cart")) {
          toast.success("Checkout now!");
        } else {
          toast.success("Hello there!");
        }
        setTimeout(() => {
          if (loc.includes("/cart")) {
            navigate("/cart");
          } else {
            navigate("/");
          }
        }, 1000);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  // ---this function is calling validation function and then call a handler signInWithEmailAndPsw---
  const login = (e) => {
    e.preventDefault();
    const fieldNames = ["email", "psw"];
    const updatedFormData = {};
    let isFormValid = true;
    fieldNames.forEach((fieldName) => {
      const value = formData[fieldName];
      const isValid = validateField(fieldName, value);
      updatedFormData[
        `is${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Empty`
      ] = !isValid;
      if (!isValid) {
        isFormValid = false;
        setIsLoading(false);
      }
    });
    if (isFormValid) {
      // Perform registration or further actions here
      // ---calling the firebase
      setIsLoading(true);
      signInWithEmailAndPassword(auth, formData.email, formData.psw)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          toast.success(user);
          const userData = {
            email: user?.email,
            userName: user?.userName,
            userID: user?.userID,
          };
          // dispatch(SET_ACTIVE_USER(userData));
          setIsLoading(false);
          if (loc.includes("/cart")) {
            toast.success("Checkout now!");
          } else {
            toast.success("Hello there!");
          }
          setTimeout(() => {
            if (loc.includes("/cart")) {
              navigate("/cart");
            } else {
              navigate("/");
            }
          }, 1000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsLoading(false);
          toast.error(errorMessage);
        });
    } else {
      // Handle invalid form case (optional)
    }
    setFormData({
      ...formData,
      ...updatedFormData,
    });
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.flexContainer}>
            <div className={styles.grid} id={styles.dskImg}>
              <div className={styles.content}>
                <img src={"/auth/1.jpg"} width="100%" />
              </div>
            </div>
            <div className={styles.grid}>
              <div className={styles.content}>
                <form className={styles.form} onSubmit={(e) => login(e)}>
                  <span className={styles.heading}>
                    <h1>Login</h1>
                  </span>

                  <div className={styles.socialContainer}>
                    <a href="#" className={styles.social}>
                      <img
                        src="/auth/gmail.png"
                        // width="20px"
                        // height="20px"

                        onClick={gmailLogin}
                      />
                    </a>
                    <a href="#" className={styles.social}>
                      <img
                        src="/auth/fb.png"
                        //   width="20px" height="20px"
                      />
                    </a>
                  </div>
                  <span className={styles.text}>or use your account</span>

                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleEmailChange}
                  />
                  {formData.isEmailEmpty && (
                    <span className={styles.errMsg}>
                      Email is required and should contain @
                    </span>
                  )}
                  <Input
                    type="password"
                    placeholder="Password"
                    value={formData.psw}
                    onChange={handlePswChange}
                  />
                  {formData.isPswEmpty && (
                    <span className={styles.errMsg}>
                      Password should be 8 char long with upper, lower case,
                      alphanumeric and special character{" "}
                    </span>
                  )}
                  <span
                    href="#"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => navigate("/reset-password")}
                  >
                    Forgot your password?
                  </span>
                  <button className={styles.btn} type="submit">
                    Log In
                  </button>
                  <span
                    href="#"
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => navigate("/register")}
                  >
                    Don't have an account? Sign up!
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
