import React from "react";
import styles from "./ProductCard.module.scss";
import { useNavigate } from "react-router-dom";
import AdminOnlyRoutes from "../../../admin-only/routes/AdminOnlyRoutes";
import { useSelector, useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../../../redux/slice/cartSlice";
const ProductCard = ({ product, del }) => {
  // ----------hooks-----------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const products = useSelector(selectProducts);
  //---------functions---------
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };
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
          onClick={(e) => {
            navigate(`/product-detail/${product?.id}`);
          }}
        />
        <div className={styles.productInfo}>
          <div className={styles.productTitle}>{product?.name}</div>
          <div className={styles.productPrice}>{product?.price}</div>
          <div className={styles.productBrand}>{product?.brand}</div>
        </div>
        <AdminOnlyRoutes>
          <div className={styles.btnGroup}>
            <button className={styles.btn}>Edit</button>
            <button className={styles.btn}>Delete</button>
          </div>
        </AdminOnlyRoutes>

        <button
          className={styles.btn}
          style={{ margin: "0 auto", display: "block" }}
          onClick={(e) => {
            addToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductCard;
