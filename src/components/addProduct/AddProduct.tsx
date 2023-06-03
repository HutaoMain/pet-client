import "./AddProduct.css";
import { Close, Check } from "@mui/icons-material";

interface props {
  toggleProductModal: () => void;
}

const AddProduct = ({ toggleProductModal }: props) => {
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
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "50%" }}>
          <label>Category</label>
          <input
            style={{ width: "95%" }}
            type="text"
            className="addproduct-input"
          />
        </div>
      </section>

      <section className="addproduct-item-list" style={{ width: "100%" }}>
        <label>Description</label>
        <input className="addproduct-input" type="text" />
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
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "30%" }}>
          <label>Vendor Price</label>
          <input
            className="addproduct-input addproduct-input-number"
            type="number"
            style={{ width: "100%" }}
          />
        </div>
        <div className="addproduct-item-list" style={{ width: "30%" }}>
          <label>Retail Price</label>
          <input
            className="addproduct-input addproduct-input-number"
            type="number"
            style={{ width: "100%" }}
          />
        </div>
      </section>
      <hr style={{ marginTop: "20px" }} />
      <div className="addproduct-btn-container">
        <button className="addproduct-btn close" onClick={toggleProductModal}>
          <Close /> Close
        </button>
        <button className="addproduct-btn submit">
          <Check /> Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
