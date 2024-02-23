import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { STORE_PRODUCTS } from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; // Import the toast library

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isHookLoading, setIsHookLoading] = useState(false);
  const getCollection = () => {
    setIsHookLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt"), limit(100));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allData, "............data in custom hook");
        setData(allData);
        setIsHookLoading(false);
      });
    } catch (error) {
      setIsHookLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getCollection();
  }, []);
  return {
    data,
    isHookLoading,
  };
};

export default useFetchCollection;
