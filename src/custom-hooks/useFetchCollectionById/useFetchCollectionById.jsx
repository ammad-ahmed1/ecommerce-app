import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Import the toast library
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const useFetchCollectionByID = (collectionName, page, pageSize, userEmail) => {
  const [data, setData] = useState([]);
  const [isHookLoading, setIsHookLoading] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  console.log(data);
  const getCollection = async () => {
    setIsHookLoading(true);
    try {
      let q = collection(db, collectionName);

      // Apply a where clause to filter documents by userEmail
      if (userEmail) {
        q = query(q, where("userEmail", "==", userEmail));
      }

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
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserOrders = async () => {
    setIsHookLoading(true);
    try {
      console.log(db);
      let q = collection(db, collectionName);
      console.log(q, ",,,,,,,,,,,,,,,,,,,,q");

      // Apply a where clause to filter documents by userName
      if (userEmail) {
        q = query(q, where("userEmail", "==", userEmail));
      }

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
    // getCollection();
    getUserOrders();
  }, [page, pageSize, userEmail]);

  return {
    data,
    totalProducts,
    isHookLoading,
    fetchData: getCollection, // Expose the function to fetch data
  };
};

export default useFetchCollectionByID;
