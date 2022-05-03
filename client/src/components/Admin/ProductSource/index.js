import "./style.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./ProductSource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductRequest,
  deleteProductRequest,
} from "../../../redux/reducers/product.js";
import { toast } from "react-toastify";
import ModalAddProduct from "../../product/ModalAddProduct.js";
import ProductForm from "../../product/ProductForm.js";
export default function Datatable({ search }) {
  const [id, setid] = useState("");
  const dispatch = useDispatch();
  const getProductSelector = useSelector(
    (state) => state.product.allPosts.data
  );

  const deleteProductSelector = useSelector(
    (state) => state.product.deletePost.isLoading
  );
  const updateProductSelector = useSelector(
    (state) => state.product.updatePost.isLoading
  );
  const createProductSelector = useSelector(
    (state) => state.product.createPost.isLoading
  );
  const response = getProductSelector
    //search
    .filter((res) => {
      if (search == "") {
        return res;
      } else if (res.name.toLowerCase().includes(search.toLowerCase())) {
        return res;
      }
    });
  useEffect(() => {
    dispatch(getProductRequest());
  }, [deleteProductSelector, createProductSelector, updateProductSelector]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắn chắn muốn xóa")) {
      dispatch(deleteProductRequest(id));
      setTimeout(() => {
        toast.success("Đã xóa thành công");
      }, 500);
    }
  };
  const handleupdate = (id) => {
    setid(id);
    setModalupdateOpen(true);
  };

  const [modalupdateOpen, setModalupdateOpen] = useState(false);
  const [modalcreateOpen, setModalcreateOpen] = useState(false);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/admin/product/:id" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <div
              className="updateButton"
              onClick={() => handleupdate(params.row.id)}
            >
              Update
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Sản phẩm
        <div
          className="link"
          onClick={() => {
            setModalcreateOpen(true);
          }}
        >
          Thêm sản phẩm
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={response}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      {modalupdateOpen && (
        <ModalAddProduct setOpen={setModalupdateOpen}>
          <ProductForm id={id} />
        </ModalAddProduct>
      )}
      {modalcreateOpen && (
        <ModalAddProduct setOpen={setModalcreateOpen}>
          <ProductForm />
        </ModalAddProduct>
      )}
    </div>
  );
}
