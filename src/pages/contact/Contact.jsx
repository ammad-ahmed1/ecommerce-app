import React from "react";
import styles from "./Contact.module.scss";
const Contact = () => {
  return (
    <div className={styles.contactUs}>
      <div className={styles.container}>
        <h1>Contact Us</h1>
        <p>
          Have questions or feedback? We'd love to hear from you! Get in touch
          with us using the form below or contact us directly via email or
          phone.
        </p>
        <div className={styles.formContainer}>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Enter your message"
                required
              />
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className={styles.contactInfo}>
          <h2>Contact Information</h2>
          <p>Email: contact@shopfromhome.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Main St, City, Country</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
