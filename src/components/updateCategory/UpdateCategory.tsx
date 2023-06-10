import React, { useEffect } from "react";
import { Close, Check } from "@mui/icons-material";
import { useState } from "react";
import { CategoryInterface } from "../../types/Types";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

interface props {
  toggleModalUpdateCategory: any;
  paramsId: string;
}

const UpdateCategory = ({ toggleModalUpdateCategory, paramsId }: props) => {
  const { data } = useQuery<CategoryInterface>({
    queryKey: ["getCategoryByIdThenUpdate"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/${paramsId}`)
        .then((res) => res.data),
  });

  const [categoryState, setCategoryState] = useState<CategoryInterface>({
    _id: "",
    categoryName: "",
  });

  useEffect(() => {
    setCategoryState({
      _id: data?._id || "",
      categoryName: data?.categoryName || "",
    });
  }, [paramsId, data]);

  const categoryNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryState({
      ...categoryState,
      categoryName: event.target.value,
    });
  };

  const handleSubmit = async () => {
    await axios.put(
      `${import.meta.env.VITE_APP_API_URL}/api/category/update/${paramsId}`,
      {
        categoryName: categoryState.categoryName,
      }
    );
    toast.success("Sucessfully updated category!", {
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
  };

  console.log(categoryState.categoryName);

  return (
    <div style={{ backgroundColor: "#ffff" }}>
      <div style={{ padding: "10px 0", fontSize: "20px" }}>Edit Category</div>
      <hr style={{ marginBottom: "20px" }} />
      <section className="addcategory-item-section" style={{ width: "100%" }}>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Category Name</label>
          <input
            className="addcategory-input"
            style={{ width: "95%" }}
            type="text"
            value={categoryState.categoryName}
            onChange={categoryNameChangeHandler}
          />
        </div>
      </section>
      <div className="addcategory-btn-container">
        <button
          className="addproduct-btn close"
          onClick={toggleModalUpdateCategory}
        >
          <Close /> Close
        </button>
        <button className="addproduct-btn submit" onClick={handleSubmit}>
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default UpdateCategory;
