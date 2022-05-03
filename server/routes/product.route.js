import express from "express";
const router = express.Router();
import multer from "multer";
import {
  GetProduct,
  CreateProduct,
  UpdateproductId,
  GetproductId,
  DeleteproductId,
} from "../controllers/ProductController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});
router.get("/", GetProduct);
router.post("/", upload.single("img"), CreateProduct);
router.get("/:id", GetproductId);
router.patch("/:id", upload.single("img"),UpdateproductId);
router.delete("/:id", DeleteproductId);
export default router;
