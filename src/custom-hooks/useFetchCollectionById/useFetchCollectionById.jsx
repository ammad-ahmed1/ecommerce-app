import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
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
const useFetchCollection = (collectionName, page, pageSize, userEmail) => {
  const [data, setData] = useState([]);
  const [isHookLoading, setIsHookLoading] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

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
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, [page, pageSize, userEmail]);

  return {
    data,
    totalProducts,
    isHookLoading,
  };
};

export default useFetchCollection;
