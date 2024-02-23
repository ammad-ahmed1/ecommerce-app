import React, { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
import { db, storage } from "../../../../firebase/config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Import the toast library
import ProductCard from "../../../../components/shared/cards/product-card/ProductCard";
import { deleteObject, ref } from "firebase/storage";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../../redux/slice/productSlice";
import useFetchCollection from "../../../../custom-hooks/useFetchCollection/useFetchCollection";
import Search from "../../../../components/shared/search/Search";
import Sort from "../../../../components/shared/sort/Sort";
const ViewProducts = () => {
  const { data, isHookLoading } = useFetchCollection("product");
  console.log(data, "......................................hook data");
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "product", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <>
      <div className={styles.searchAndSort}>
        <Search />
        <Sort />
      </div>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} del={deleteProduct} />
        ))}
      </div>
    </>
  );
};

export default ViewProducts;
