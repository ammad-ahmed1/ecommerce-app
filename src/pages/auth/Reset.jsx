import React, { useState } from "react";
import styles from "./auth.module.scss";
import Loader from "../../components/shared/loader/Loader";
import { toast } from "react-toastify"; // Import the toast library
import { auth } from "../../firebase/config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const resetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await sendPasswordResetEmail(auth, email);
      setIsLoading(false);
      toast.success("Link sent to given email update password and login");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (e) {
      setIsLoading(false);
      toast.error("Password reset failed!");
      // toast.error(e);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={styles.container}>
            <div className={styles.flexContainer}>
              <div className={styles.grid} id={styles.dskImg}>
                <div className={styles.content}>
                  <img src={"/public/auth/login-img.avif"} width="100%" />
                </div>
              </div>
              <div className={styles.grid}>
                <div className={styles.content}>
                  <form onSubmit={resetPassword} className={styles.form}>
                    <span className={styles.heading}>
                      <h1>Reset</h1>
                    </span>
                    {/* <div className={styles.socialContainer}>
                  <a href="#" className={styles.social}>
                    <img
                      src="/public/auth/gmail.png"
                      // width="20px"
                      // height="20px"
                    />
                  </a>
                  <a href="#" className={styles.social}>
                    <img
                      src="/public/auth/fb.png"
                      //   width="20px" height="20px"
                    />
                  </a>
                </div> */}
                    <span className={styles.text}>
                      Type your email for recovery
                    </span>

                    <input
                      className={styles.input}
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className={styles.btn}>Reset</button>
                    <div className={styles.btnGrid}>
                      <button
                        className={styles.btn}
                        onClick={(e) => navigate("/login")}
                      >
                        Go to Login
                      </button>
                      <button
                        className={styles.btn}
                        onClick={(e) => navigate("/register")}
                      >
                        Go to Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reset;
