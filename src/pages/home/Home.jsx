import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import Hero from "../../components/hero/Hero";
// import { setupNotifications } from "../../firebase/config";
import useVisibilityChange from "../../custom-hooks/useVisibilityChange/useVisibilityChange";
import { register } from "../../../public/serviceWorker";
import { toast } from "react-toastify";
import {
  sendNativeNotification,
  toastNotification,
} from "../../utils/helper/notificationHelpers";
const Home = () => {
  // ---------hooks----------
  const isForeground = useVisibilityChange();
  console.log(isForeground);
  // --------effect----------
  useEffect(() => {
    // setupNotifications((message) => {
    //   console.log(message);
    //   console.log("push notifications setup");
    //   if (isForeground) {
    //     console.log("sssssssssssssssssss");
    //     // App is in the foreground, show toast notification
    //     toastNotification({
    //       title,
    //       description: body,
    //       status: "info",
    //     });
    //     toast.success("Toast notification");
    //   } else {
    //     sendNativeNotification({
    //       title,
    //       body,
    //     });
    //     // App is in the background, show native notification
    //     toast.success("Native notification");
    //   }
    // });
  }, []);
  return (
    <>
      <div>
        <Hero />
      </div>
      <div className={styles.grid_container}>
        <div className={styles.grid_item}>
          <img
            src="/public/homepage/fashion.jpg"
            alt="Image 1"
            className={styles.image}
          />
          <div className={styles.text}>Fashion Clothing</div>
        </div>
        <div className={styles.grid_item}>
          <img
            src="/public/homepage/electronics.jpeg"
            alt="Image 2"
            className={styles.image}
          />
          <div className={styles.text}>Electronic Appliances</div>
        </div>
        <div className={styles.grid_item}>
          <img
            src="/public/homepage/mobiles.jpg"
            alt="Image 1"
            className={styles.image}
          />
          <div className={styles.text}>Mobile Phones</div>
        </div>
        <div className={styles.grid_item}>
          <img
            src="/public/homepage/laptops.avif"
            alt="Image 2"
            className={styles.image}
          />
          <div className={styles.text}>Laptops</div>
        </div>
      </div>
    </>
  );
};

export default Home;
