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
import Loader from "../../../../components/shared/loader/Loader";
const ViewProducts = () => {
  //--------------hooks--------------
  const { data, isHookLoading } = useFetchCollection("product");
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  //--------------states-------------
  const [search, setSearch] = useState("");
  //------------functions------------
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
  //--------------effects-------------
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
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        <Sort />
      </div>
      {isHookLoading ? (
        <Loader />
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              del={deleteProduct}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ViewProducts;
