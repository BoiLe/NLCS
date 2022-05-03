import React from "react";
import "./Modal.css";

function ModalAddProduct({ setOpen, children }) {
  const paperStyle = {
    padding: 20,
    height: "600px",
    width: "500px",
    margin: "20px auto",
  };
  return (
    <div className="modalBackground" >
      <div className="modalContainer" style={paperStyle}>
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Product Detail </h1>
        </div>
        <div className="body">{children}</div>
        <div className="footer">
          <button
            onClick={() => {
              setOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddProduct;
