import React, { useCallback, useEffect, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { pageStyle, pageTransition, pageVariants } from "./Styles";
import { toast } from "react-toastify";
export default function Login() {
  const paperStyle = {
    padding: 20,
    height: "500px",
    width: 500,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "10px 10px 50px 10px" };
  const inputerror = { color: "red" };
  const userLogin = useSelector((state) => state.user.login.requesting);
  const userLoginsucess = useSelector((state) => state.user.login.successful);
  const adminLoginsucess = useSelector((state) => state.user.login.currentuser);
  console.log(adminLoginsucess);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
    }),
    onSubmit: (values, props) => {
      dispatch(login(values));
      setemail(values.email);
      setpassword(values.password);
      setTimeout(() => {
        props.resetForm();
        props.setSubmitting(false);
      }, 2000);
    },
  });
  useEffect(() => {
    if (userLoginsucess) {
      if (adminLoginsucess.user.is_admin === true) {
        navigate("/admin");
        toast.success("Đăng nhập thành công");
      } else {
        navigate("/");
        toast.success("Đăng nhập thành công");
      }
    }
  }, [userLoginsucess]);

  return (
    <motion.div
      style={pageStyle}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  autoFocus
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Enter your email"
                />
                {formik.errors.email && (
                  <Typography variant="secondary" className={inputerror}>
                    {formik.errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Enter your password"
                />
                {formik.errors.password && (
                  <Typography variant="primary">
                    {formik.errors.password}
                  </Typography>
                )}
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
              {formik.isSubmitting ? "Loading" : "Sign in"}
            </Button>
          </form>
          <Typography>
            <Link to="#">Forgot password ?</Link>
          </Typography>
          <Typography
            variant="h4"
            component={Link}
            to="/register"
            color="inherit"
          >
            Do you have an account ?
          </Typography>
        </Paper>
      </Grid>
    </motion.div>
  );
}
