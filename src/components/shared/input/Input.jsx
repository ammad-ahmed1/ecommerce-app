import React from "react";
import styles from "./Input.module.scss";
const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
// Input.propTypes = {
//   type: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onChange: PropTypes.func.isRequired,
// };

export default Input;
