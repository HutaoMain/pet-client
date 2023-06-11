import { useQuery } from "react-query";
import { CategoryInterface, getProductInterface } from "../../../types/Types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Close, Check } from "@mui/icons-material";

interface props {
  toggleModalUpdate: any;
  paramsId: string;
}

const UpdateProduct = ({ toggleModalUpdate, paramsId }: props) => {
  const [categoryList, setCategoryList] = useState<CategoryInterface[]>();

  const { data } = useQuery<getProductInterface>({
    queryKey: ["updateProduct"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/product/${paramsId}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/category/list`
        );
        setCategoryList(res.data);
      };
      fetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [productInfo, setProductInfo] = useState<getProductInterface>({
    _id: "",
    productName: "",
    description: "",
    category: "",
    quantity: 0,
    vendorPrice: 0,
    vendor: "",
    retailPrice: 0,
    status: "In Stock",
  });

  useEffect(() => {
    setProductInfo({
      _id: data?._id || "",
      productName: data?.productName || "",
      description: data?.description || "",
      category: data?.category || "",
      quantity: data?.quantity || 0,
      vendorPrice: data?.vendorPrice || 0,
      vendor: data?.vendor || "",
      retailPrice: data?.retailPrice || 0,
      status: data?.status || "In Stock",
    });
  }, [paramsId, data]);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;

    setProductInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/product/update/${paramsId}`,
        { ...productInfo }
      );
      toast.success("Sucessfully updated product!", {
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

  return (
    <div className="addproduct">
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Update Product</div>
      <hr style={{ marginBottom: "20px" }} />
      <section className="addproduct-item-section" style={{ width: "100%" }}>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Product Name</label>
          <input
            className="addproduct-input"
            style={{ width: "95%" }}
            type="text"
            name="productName"
            value={productInfo.productName}
            onChange={onChangeHandler}
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Category</label>
          <select
            className="addproduct-input"
            name="category"
            value={productInfo.category}
            onChange={onChangeHandler}
          >
            <option value="">please select category</option>
            {categoryList?.map((item, index) => (
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
          value={productInfo.description}
          onChange={onChangeHandler}
        />
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label style={{ marginTop: "10px" }}>Vendor Name: </label>
        <input
          className="addproduct-input"
          type="text"
          name="vendor"
          value={productInfo.vendor}
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
            value={productInfo.quantity}
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
            value={productInfo.vendorPrice}
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
            value={productInfo.retailPrice}
            onChange={onChangeHandler}
          />
        </div>
      </section>
      <hr style={{ marginTop: "20px" }} />
      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleModalUpdate}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
