import React, { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
import { db, storage } from "../../../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Import the toast library
import ProductCard from "../../../../components/shared/cards/product-card/ProductCard";
import { deleteObject, ref } from "firebase/storage";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
} from "../../../../redux/slice/filterSlice";
import useFetchCollection from "../../../../custom-hooks/useFetchCollection/useFetchCollection";
import Search from "../../../../components/shared/search/Search";
import Sort from "../../../../components/shared/sort/Sort";
import Loader from "../../../../components/shared/loader/Loader";
import ClientSidebar from "../../../../components/shared/sidebar/ClientSidebar";
import Pagination from "../../../../components/shared/pagination/Pagination";
import { ADD_TO_CART } from "../../../../redux/slice/cartSlice";
import {
  fetchProducts,
  filterProducts,
  selectProducts,
  selectIsFetchLoading,
  selectIsFilterLoading,
  selectFilteredProducts,
  searchProducts,
  selectSearchedProducts,
  selectPagination,
  selectFilters,
} from "../../../../redux/slice/productSlice";

const ViewProducts = () => {
  //--------------states-------------
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const pageSize = 3;
  //--------------hooks--------------
  const dispatch = useDispatch();
  const { data, isHookLoading, totalProducts } = useFetchCollection(
    "product",
    page,
    pageSize
  );
  const products = useSelector(selectProducts);
  const searchedProducts = useSelector(selectSearchedProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const isFetchLoading = useSelector(selectIsFetchLoading);
  const isFilterLoading = useSelector(selectIsFilterLoading);
  // console.log(filteredProducts);
  //------------functions------------
  const dispatchFilterProduct = (category, priceRange) => {
    dispatch(filterProducts(category, priceRange));
  };
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
    dispatch(fetchProducts());
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(filterProducts({ category: "Phone", price: "5000" }));
  }, []);
  // ---------------------------------
  useEffect(() => {
    dispatch(searchProducts(search));
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
          filterProductsFunc={dispatchFilterProduct}
        />
        <div>
          <div className={styles.searchAndSort}>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Sort sort={sort} setSort={setSort} />
          </div>
          {isFetchLoading || isFilterLoading ? (
            <Loader />
          ) : (
            <div>
              <div className={styles.productGrid}>
                {catFilter || priceFilter
                  ? filteredProducts?.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        del={deleteProduct}
                      />
                    ))
                  : searchedProducts?.length > 0
                  ? searchedProducts?.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        del={deleteProduct}
                      />
                    ))
                  : products?.map((product) => (
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
