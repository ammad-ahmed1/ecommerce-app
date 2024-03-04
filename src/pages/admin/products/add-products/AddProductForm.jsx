// AddProductForm.jsx

import React, { useState } from "react";
import styles from "./AddProduct.module.scss"; // Import CSS module
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify"; // Import the toast library
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectProducts } from "../../../../redux/slice/productSlice";
const categories = [
  {
    id: 1,
    name: "Electronics",
    subcategories: ["LCD", "Fridge", "Microwave Oven", "Cameras"],
  },
  {
    id: 2,
    name: "Clothing",
    subcategories: ["Men's Clothing", "Women's Clothing", "Kid's Clothing"],
  },
  {
    id: 3,
    name: "Home & Furniture",
    subcategories: ["Furniture", "Home Decor", "Kitchenware", "Bedding"],
  },
  {
    id: 4,
    name: "Laptop",
    subcategories: ["5th gen", "7th gen", "8th gen", "11th gen"],
  },
  {
    id: 5,
    name: "Phone",
    subcategories: ["4/32", "4/64", "4/128", "8/128"],
  },
  // Add more categories
];

const AddProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const storage = getStorage();
  const products = useSelector(selectProducts);
  const detectForm = (id, f1, f2) => {
    if (id === undefined) {
      return f1;
    }
    return f2;
  };
  const productEdit = products.find((item) => {
    if (item.id === id) {
      return item;
    }
  });
  const initialState = {
    name: "",
    category: "",
    subcategory: "",
    tags: "",
    price: 0,
    description: "",
    tagline: "",
    images: [],
    brand: "",
  };
  const [formData, setFormData] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e) => {
    console.log(
      productEdit?.imageURL,
      "...........delete this img............."
    );
    if (formData?.imageURL || productEdit?.imageURL) {
      console.log(productEdit?.imageURL);
      const storageRef = ref(storage, productEdit?.imageURL);
      await deleteObject(storageRef);
    }

    const file = e.target.files[0];
    console.log(file);
    const storageRef = ref(storage, `sfh/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //saving it in product obj
          setFormData({ ...formData, imageURL: downloadURL });
          toast.success("Image uploaded successfuly!");
        });
      }
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle submit called");
    const res = detectForm(id, addProduct, editProduct); // Pass functions as arguments
    await res(); // Invoke the appropriate function returned by detectForm
  };
  const addProduct = async () => {
    try {
      console.log("adding product");
      setIsLoading(true);
      const docRef = await addDoc(collection(db, "product"), {
        name: formData?.name,
        category: formData.category,
        subcategory: formData.subcategory,
        tags: formData.tags,
        price: Number(formData.price),
        description: formData.description,
        tagline: formData.tagline,
        images: formData.imageURL,
        brand: formData.brand,
        createdAt: Timestamp.now().toDate(),
      });
      toast.success("Product uploaded succesfuly");
      setIsLoading(false);
      setFormData({ ...initialState });
      setUploadProgress(0);
      navigate("/admin/view-products");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  const editProduct = async () => {
    try {
      console.log("editting product");
      setIsLoading(true);

      await updateDoc(doc(db, "product", id), {
        name: formData?.name,
        category: formData?.category,
        subcategory: formData?.subcategory,
        tags: formData?.tags,
        price: Number(formData?.price),
        description: formData?.description,
        tagline: formData?.tagline,
        images: formData?.imageURL,
        brand: formData?.brand,
        createdAt: productEdit?.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      toast.success("Product edited succesfuly");
      setIsLoading(false);
      setFormData({ ...initialState });
      setUploadProgress(0);
      navigate("/admin/view-products");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.productForm}>
      {/* Use CSS module class */}
      <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData?.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Category:
        <select
          name="category"
          value={formData?.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Subcategory:
        <select
          name="subcategory"
          value={formData?.subcategory}
          onChange={handleChange}
          required
        >
          <option value="">Select Subcategory</option>
          {categories
            .find((cat) => cat.name === formData?.category)
            ?.subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>
      </label>
      <label>
        Tags:
        <input
          type="text"
          name="tags"
          value={formData?.tags}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData?.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData?.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Tagline:
        <input
          type="text"
          name="tagline"
          value={formData?.tagline}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Brand:
        <input
          type="text"
          name="brand"
          value={formData?.brand}
          onChange={handleChange}
          required
        />
      </label>
      {/* Additional Fields for Clothing */}
      {formData?.category === "Clothing" && (
        <>
          <label>
            Sizes Available:
            <input
              type="text"
              name="sizes"
              value={formData?.sizes}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Number of Items:
            <input
              type="number"
              name="quantity"
              value={formData?.quantity}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Cost Price:
            <input
              type="number"
              name="costPrice"
              value={formData?.costPrice}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Sell Price:
            <input
              type="number"
              name="sellPrice"
              value={formData?.sellPrice}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Discount:
            <input
              type="number"
              name="discount"
              value={formData?.discount}
              onChange={handleChange}
              required
            />
          </label>
        </>
      )}
      {/* Image upload */}
      <label>
        Image:
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {/* {formData?.imageURL !== null ? (
      <img
        src={formData.imageURL}
        alt="Uploaded"
        style={{ maxWidth: "100px" }}
      />
    ) : (
      <img
        src={formData.images}
        alt="Uploaded"
        style={{ maxWidth: "100px" }}
      />
    )} */}
        {JSON.stringify(formData?.imageURL ? "Not null" : "null")}
        {formData?.images && !formData.imageURL ? (
          <>
            <img
              src={formData.images}
              alt="Uploaded"
              style={{ maxWidth: "100px" }}
            />
            {JSON.stringify(formData.images)}
            <p>I am imageUrl is null</p>
          </>
        ) : (
          <img
            src={formData?.imageURL}
            alt="Uploaded"
            style={{ maxWidth: "100px" }}
          />
        )}
        <p>{uploadProgress < 100 ? `${uploadProgress}%` : "Uploaded!"}</p>
        <p>{formData?.imageURL}</p>
      </label>
      <button type="submit">
        {detectForm(id, "Add New Product", "Edit Product")}
      </button>
    </form>
  );
};

export default AddProductForm;
