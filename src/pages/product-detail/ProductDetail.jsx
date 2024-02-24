// ProductDetailPage.js

import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/shared/loader/Loader";
import { toast } from "react-toastify"; // Import the toast library
const ProductDetail = () => {
  // ----------------hooks---------------
  const { id } = useParams();
  const navigate = useNavigate();
  // ---------------states---------------
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // --------------functions-------------
  const getProductDetail = async () => {
    setIsLoading(true);
    const docRef = doc(db, "product", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setProduct(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      toast.error("Product not found");
    }
    setIsLoading(false);
  };
  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change)); // Ensure quantity doesn't go below 1
  };
  // --------------Effect-------------
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.backBtnDiv}>
            <button
              className={styles.btnBack}
              onClick={(e) => {
                navigate("/view-products");
              }}
            >
              Back
            </button>
          </div>
          <div className={styles.productDetail}>
            <div className={styles.productImage}>
              <img src={product?.images} alt={product?.name} />
            </div>
            <div className={styles.productInfo}>
              <h2>{product?.name}</h2>
              <p className={styles.price}>${product?.price}</p>
              <p className={styles.description}>{product?.description}</p>
              <div className={styles.quantitySelector}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <span className={styles.quantity}>{quantity}</span>
                <button
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              <button className={styles.btnAddToCart}>Add to Cart</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
