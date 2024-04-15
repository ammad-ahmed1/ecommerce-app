import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { STORE_PRODUCTS } from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; // Import the toast library

const useFetchCollection = (collectionName, page, pageSize, triggerFetch) => {
  const [data, setData] = useState([]);
  const [isHookLoading, setIsHookLoading] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const getCollection = async () => {
    setIsHookLoading(true);
    try {
      console.log(db);
      let q = collection(db, collectionName);
      console.log(q);
      if (lastDocument) {
        q = query(
          q,
          orderBy("createdAt"),
          startAfter(lastDocument),
          limit(pageSize)
        );
      } else {
        q = query(q, orderBy("createdAt"), limit(pageSize));
      }

      const snapshot = await getDocs(q);
      const allData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(allData);
      setData(allData);
      setIsHookLoading(false);

      // Update the last document snapshot
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastDocument(lastDoc);

      // Fetch total count of products
      const totalProductsSnapshot = await getDocs(
        collection(db, collectionName)
      );
      setTotalProducts(totalProductsSnapshot.size);
    } catch (error) {
      setIsHookLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, [page, pageSize, triggerFetch]);

  return {
    data,
    totalProducts,
    isHookLoading,
  };
};

export default useFetchCollection;
