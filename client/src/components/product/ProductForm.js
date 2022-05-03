import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import { useDispatch } from "react-redux";
import {
  createProductRequest,
  updateProductRequest,
} from "../../redux/reducers/product.js";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Button, Grid, TextField, Typography } from "@mui/material";
import * as Yup from "yup";

const ProductForm = ({ id }) => {
  console.log(id)
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [brand, setBrand] = useState("");
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const [data, setData] = useState({ emai: "", password: "" });

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/png",
    "image/jpeg",
    "image/gif",
  ];
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      brand: "",
      describe: "",
      img: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name product is required")
        .min(2, "Too Short!")
        .max(50, "Too Long!"),
      price: Yup.number()
        .typeError("That doesn't look like a number")
        .positive("Price can't start with a minus")
        .integer("Price can't include a decimal point")
        .min(10)
        .required("Price is required"),
      describe: Yup.string()
        .required("Describe is required")
        .min(2, "Too Short!")
        .max(100, "Too Long!"),
      brand: Yup.string()
        .required("Brand is required")
        .min(2, "Too Short!")
        .max(50, "Too Long!"),
      img: Yup.mixed()
        .nullable()
        .required("Required Field")
        .test("size", "File is too large", (value) => {
          //*************** THESE ARE ALTERNATIVE WAY TO VALIDATE IMAGE *****************/
          return value && value.size <= 5 * 1024 * 1024; // 5MB
        })
        .test("type", "Invalid file format", (value) => {
          return (
            (value && value.type === "image/jpeg") ||
            value.type === "image/jpg" ||
            value.type === "image/png"
          );
        })
        .test(
          "size",
          "File size is too big",
          (value) => value && value.size <= 1024 * 1024 // 5MB
        )
        .test(
          "type",
          "Invalid file format selection",
          (value) =>
            // console.log(value);
            !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        ),
    }),
    onSubmit: (values, props) => {
      if (id === undefined) {
        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        dispatch(createProductRequest(formData));
        setTimeout(() => {
          toast.success("Đã thêm thành công");
          props.resetForm();
          props.setSubmitting();
        }, 2000);
      } else {
        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        dispatch(updateProductRequest({ id, formData }));
        setTimeout(() => {
          toast.success("Đã sửa thành công");
          props.resetForm();
          props.setSubmitting();
        }, 2000);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name Product"
            name="name"
            autoFocus
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter your name Product"
          />
          {formik.errors.name && (
            <Typography variant="secondary"> {formik.errors.name} </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price of product"
            name="price"
            onBlur={formik.handleBlur}
            value={formik.values.price}
            onChange={formik.handleChange}
            placeholder="Enter your price"
          />
          {formik.errors.price && (
            <Typography variant="secondary"> {formik.errors.price} </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Brand of product"
            name="brand"
            onBlur={formik.handleBlur}
            value={formik.values.brand}
            onChange={formik.handleChange}
            placeholder="Enter your brand"
          />
          {formik.errors.brand && (
            <Typography variant="secondary"> {formik.errors.brand} </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Describe of product"
            name="describe"
            onBlur={formik.handleBlur}
            value={formik.values.describe}
            onChange={formik.handleChange}
            placeholder="Enter your describe"
          />
          {formik.errors.describe && (
            <Typography variant="secondary">
              {" "}
              {formik.errors.describe}{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="img"
            type="file"
            accept="image/*"
            onChange={(e) =>
              formik.setFieldValue("img", e.currentTarget.files[0])
            }
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={formik.isSubmitting}
        style={btnstyle}
        fullWidth
      >
        {formik.isSubmitting ? "Loading" : "Xác nhận"}
      </Button>
    </form>
  );
};

export default ProductForm;
