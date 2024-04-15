import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import AdminOnlyRoutes from "../admin-only/routes/AdminOnlyRoutes";
import ShowOnLogin from "../hidden-link/HiddenLink";

const Header = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const navigate = useNavigate();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(REMOVE_ACTIVE_USER());
        toast.success("See you soon!");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user?.displayName === null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user?.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user?.email,
            userName: user?.displayName ? user?.displayName : displayName,
            userID: user?.uid,
          })
        );
        // ...
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
    return () => {};
  }, []);

  return (
    <>
      <div className={styles.headerDesktop}>
        <div className={styles.left}>
          <span className={styles.logo}>Shop From Home</span>
        </div>
        <div className={styles.right}>
          <AdminOnlyRoutes>
            <Link to="/admin/dashboard">
              <button className={styles.adminBtn}>Admin</button>
            </Link>
          </AdminOnlyRoutes>

          <Link to="/" className={styles.nav}>
            Home
          </Link>
          <Link to="/about" className={styles.nav}>
            About
          </Link>
          <Link to="/contact" className={styles.nav}>
            Contact Us
          </Link>
          <Link to="/order-status" className={styles.nav}>
            Orders
          </Link>
          <Link to="/cart" className={styles.nav}>
            <img src="/icons/cart-icon.png" />
          </Link>
          <div className={styles.logoutBtnContainer}>
            <ShowOnLogin>
              <button className={styles.logoutBtn} onClick={logoutUser}>
                Logout
              </button>
            </ShowOnLogin>
          </div>
        </div>
      </div>
      <div className={styles.headerMobile}>
        <div className={styles.left}>
          <span className={styles.logo}>Shop From Home</span>
        </div>
        <div className={styles.right}>
          <button className={styles.toggleBtn} onClick={toggleMenu}>
            {!showMenu ? (
              <img src="../../../icons/hamburger-icon.png" />
            ) : (
              <img src="../../../icons/x-icon.png" className={styles.x} />
            )}
          </button>
        </div>
      </div>
      {showMenu && (
        <div className={`${styles.drawer}`}>
          <span className={styles.drawerLogo}>SFH</span>
          <Link to="/admin" className={styles.mobNav}>
            Admin
          </Link>
          <Link to="/" className={styles.mobNav}>
            Home
          </Link>
          <Link to="/about" className={styles.mobNav}>
            About
          </Link>
          <Link to="/contact" className={styles.mobNav}>
            Contact Us
          </Link>
          <div className={styles.logoutBtnContainer}>
            <ShowOnLogin>
              {" "}
              <button className={styles.logoutBtn} onClick={logoutUser}>
                Logout
              </button>
            </ShowOnLogin>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
