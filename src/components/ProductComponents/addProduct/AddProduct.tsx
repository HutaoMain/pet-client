import axios from "axios";
import { CategoryInterface, addProductInterface } from "../../../types/Types";
import "./AddProduct.css";
import { Close, Check } from "@mui/icons-material";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface props {
  toggleProductModal: () => void;
}

const AddProduct = ({ toggleProductModal }: props) => {
  const { data } = useQuery<CategoryInterface[]>({
    queryKey: ["addProduct"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/list`)
        .then((res) => res.data),
  });

  const [addProductInfo, setAddProductInfo] = useState<addProductInterface>({
    productName: "",
    description: "",
    category: "",
    quantity: 0,
    vendorPrice: 0,
    vendor: "",
    retailPrice: 0,
    status: "In Stock",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;

    setAddProductInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/product/create`,
        { ...addProductInfo }
      );
      toast.success("Sucessfully added product!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(addProductInfo);

  return (
    <div className="addproduct">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Add Product</div>
      <hr style={{ marginBottom: "20px" }} />
      <section className="addproduct-item-section" style={{ width: "100%" }}>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Product Name</label>
          <input
            className="addproduct-input"
            style={{ width: "95%" }}
            type="text"
            name="productName"
            value={addProductInfo.productName}
            onChange={onChangeHandler}
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Category</label>
          <select
            className="addproduct-input"
            name="category"
            value={addProductInfo.category}
            onChange={onChangeHandler}
          >
            <option value="">please select category</option>
            {data?.map((item, index) => (
              <option value={item.categoryName} key={index}>
                {item.categoryName}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Description</label>
        <input
          className="addproduct-input"
          type="text"
          name="description"
          value={addProductInfo.description}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Status</label>
        <select name="" id="" className="addproduct-input ">
          <option value="">In Stock</option>
          <option value="">Out of Stock</option>
        </select>
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label style={{ marginTop: "10px" }}>Vendor Name: </label>
        <input
          className="addproduct-input"
          type="text"
          name="vendor"
          value={addProductInfo.vendor}
          onChange={onChangeHandler}
        />
      </section>

      <section
        className="addproduct-item-section"
        style={{ width: "100%", gap: "15px" }}
      >
        <div className="addproduct-item-list" style={{ width: "30%" }}>
          <label>Qty</label>
          <input
            className="addproduct-input addproduct-input-number"
            type="number"
            style={{ width: "100%" }}
            name="quantity"
            value={addProductInfo.quantity}
            onChange={onChangeHandler}
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "30%" }}>
          <label>Vendor Price</label>
          <input
            className="addproduct-input addproduct-input-number"
            type="number"
            style={{ width: "100%" }}
            name="vendorPrice"
            value={addProductInfo.vendorPrice}
            onChange={onChangeHandler}
          />
        </div>

        <div className="addproduct-item-list" style={{ width: "30%" }}>
          <label>Retail Price</label>
          <input
            className="addproduct-input addproduct-input-number"
            type="number"
            style={{ width: "100%" }}
            name="retailPrice"
            value={addProductInfo.retailPrice}
            onChange={onChangeHandler}
          />
        </div>
      </section>
      <hr style={{ marginTop: "20px" }} />
      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleProductModal}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
