import React from "react";
import styles from "./ProductCard.module.scss";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product, del }) => {
  const deleteBox = (
    <div>
      <p>Are you sure you want to delete it?</p>
      <div style={{ display: "flex", width: "100%", justifyContent: "right" }}>
        <div>
          <button
            style={{ background: "red", color: "white", borderRadius: "12px" }}
          >
            Yes
          </button>
        </div>
        <div style={{ marginLeft: "15px" }}>
          <button
            style={{
              background: "yellow",
              color: "white",
              borderRadius: "12px",
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
  const navigate = useNavigate();
  const handleDelete = (product) => {
    console.log(product);
    // alert(deleteBox);
    del(product.id, product.images);
  };
  const handleEdit = (product) => {
    navigate(`/admin/edit-product/${product?.id}`);
  };
  return (
    <>
      <div className={styles.productCard}>
        <img
          className={styles.productImage}
          src={product?.images}
          alt="Product Image"
        />
        <div className={styles.productInfo}>
          <div className={styles.productTitle}>{product?.name}</div>
          <div className={styles.productPrice}>{product?.price}</div>
          <div className={styles.productBrand}>{product?.brand}</div>
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn}>Edit</button>
          <button className={styles.btn}>Delete</button>
        </div>
        <button
          className={styles.btn}
          style={{ margin: "0 auto", display: "block" }}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductCard;
