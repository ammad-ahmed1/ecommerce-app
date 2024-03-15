import React, { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
import { db, storage } from "../../../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Import the toast library
import ProductCard from "../../../../components/shared/cards/product-card/ProductCard";
import { deleteObject, ref } from "firebase/storage";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../../redux/slice/productSlice";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "../../../../redux/slice/filterSlice";
import { ADD_TO_CART } from "../../../../redux/slice/cartSlice";
import useFetchCollection from "../../../../custom-hooks/useFetchCollection/useFetchCollection";
import Search from "../../../../components/shared/search/Search";
import Sort from "../../../../components/shared/sort/Sort";
import Loader from "../../../../components/shared/loader/Loader";
import ClientSidebar from "../../../../components/shared/sidebar/ClientSidebar";
import Pagination from "../../../../components/shared/pagination/Pagination";

const ViewProducts = () => {
  //--------------states-------------
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const pageSize = 3;
  //--------------hooks--------------
  const { data, isHookLoading, totalProducts } = useFetchCollection(
    "product",
    page,
    pageSize
  );
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  //------------functions------------
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
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
    //dispatch, data
  }, [dispatch, data]);
  // ---------------------------------
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products: products, search: search }));
  }, [search, dispatch, products]);
  // ---------------------------------
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products: products, sort: sort }));
  }, [sort, dispatch, products]);
  return (
    <>
      <div style={{ display: "flex" }}>
        <ClientSidebar
          catFilter={catFilter}
          setCatFilter={setCatFilter}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
        />
        <div>
          <div className={styles.searchAndSort}>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Sort sort={sort} setSort={setSort} />
          </div>
          {isHookLoading ? (
            <Loader />
          ) : (
            <div>
              <div className={styles.productGrid}>
                {search || catFilter || priceFilter
                  ? filteredProducts?.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        del={deleteProduct}
                      />
                    ))
                  : data?.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        del={deleteProduct}
                      />
                    ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(totalProducts / pageSize)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewProducts;
