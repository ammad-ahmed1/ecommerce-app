import React, { useState } from "react";
import styles from "./auth.module.scss";
import Input from "../../components/shared/input/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/shared/loader/Loader";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    psw: "",
    phNo: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleNameChange = (e) => {
    //setName(e.target.value);
    const { value } = e.target;
    setFormData({
      ...formData,
      name: value,
    });
  };

  const handlePhNoChange = (e) => {
    //setPhNo(e.target.value);
    const { value } = e.target;
    setFormData({
      ...formData,
      phNo: value,
    });
  };

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

  const handleGenderChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      gender: value,
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
  const checkEmailVerificationStatus = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      if (user.emailVerified) {
        // User is verified, proceed to main application
        return true;
      } else {
        // User is not verified, prompt the user to check their email
        return false;
      }
    } else {
      // No user is signed in
    }
  };

  const register = async (e) => {
    e.preventDefault();
    const fieldNames = ["name", "email", "phNo", "psw", "gender"];
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
      }
    });
    if (isFormValid) {
      // Perform registration or further actions here
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, formData.email, formData.psw)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoading(false);
          toast.success("Registered successfully!");
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setIsLoading(false);
          // ..
        });
    } else {
      // Handle invalid form case (optional)
      toast.error("Invalid inputs");
    }
    setFormData({
      ...formData,
      ...updatedFormData,
    });
  };

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.flexContainer}>
            <div className={styles.grid} id={styles.dskImg}>
              <div className={styles.content}>
                <img src={"/auth/register.jpg"} width="100%" />
              </div>
            </div>
            <div className={styles.grid}>
              <div className={styles.content}>
                <form
                  //action="#"
                  className={styles.form}
                  onSubmit={(e) => register(e)}
                >
                  <span className={styles.heading}>
                    <h1>Register</h1>
                  </span>
                  <div className={styles.socialContainer}>
                    <a href="#" className={styles.social}>
                      <img
                        src="/auth/gmail.png"
                        // width="20px"
                        // height="20px"
                      />
                    </a>
                    <a href="#" className={styles.social}>
                      <img
                        src="/auth/fb.png"
                        //   width="20px" height="20px"
                      />
                    </a>
                  </div>
                  <span className={styles.text}>or create your account</span>

                  <Input
                    type="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleNameChange}
                  />
                  {formData.isNameEmpty && (
                    <span className={styles.errMsg}>Name is required</span>
                  )}
                  <Input
                    type="number"
                    placeholder="Ph #"
                    value={formData.phNo}
                    onChange={handlePhNoChange}
                  />
                  {formData.isPhNoEmpty && (
                    <span className={styles.errMsg}>
                      Phone # should be 10 char long with no only
                    </span>
                  )}
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
                  <div className={styles.radios} onChange={handleGenderChange}>
                    <input
                      type="radio"
                      value="Male"
                      name="gender"
                      checked={formData.gender === "Male"}
                    />{" "}
                    <p className={styles.text}>Male</p>
                    <input
                      type="radio"
                      value="Female"
                      name="gender"
                      checked={formData.gender === "Female"}
                    />{" "}
                    <p className={styles.text}>Female</p>
                    <input
                      type="radio"
                      value="Other"
                      name="gender"
                      checked={formData.gender === "Other"}
                    />{" "}
                    <p className={styles.text}>Other</p>
                  </div>
                  {formData.isGenderEmpty && (
                    <span className={styles.errMsg}>
                      Plz select your gender
                    </span>
                  )}
                  <button className={styles.btn} type="submit">
                    Register
                  </button>
                  <a href="#">Do you already have an account?</a>

                  <button
                    className={styles.btn}
                    onClick={() => navigate("/login")}
                  >
                    Go to Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
