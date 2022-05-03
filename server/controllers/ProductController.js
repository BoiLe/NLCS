import { ProductModel } from "../models/ProductModel.js";
// [GET] all product
export const GetProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page || "0");
    const limit = 5;
    if (page) {
      const start = (page - 1) * limit;
      ProductModel.find({})
        .skip(start)
        .limit(limit)
        .then((Products) => {
          const result = {
            count: Products.length,
            Products: Products.map((Product) => {
              return {
                id: Product._id,
                name: Product.name,
                price: Product.price,
                brand: Product.brand,
                img: Product.img,
                describe: Product.describe,
                request: {
                  type: "GET",
                  url: "http://localhost:5000/product/" + Product._id,
                },
              };
            }),
          };
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json({ message: "Lỗi Server" });
        });
    } else {
      const Products = await ProductModel.find(); // return all product in database
      const response = {
        count: Products.length,
        Products: Products.map((Product) => {
          return {
            id: Product._id,
            name: Product.name,
            price: Product.price,
            brand: Product.brand,
            img: Product.img,
            describe: Product.describe,
            request: {
              type: "GET",
              url: "http://localhost:5000/product/" + Product._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ message: "Lỗi Server" });
  }
};

// [POST] create Product
export const CreateProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = new ProductModel({
      name: data.name,
      price: data.price,
      brand: data.brand,
      img: req.file.path,
      describe: data.describe,
    });
    console.log(product);
    await product.save();
    res.status(200).json({
      message: "Lưu sản phẩm thành công",
      product: {
        name: product.name,
        price: product.price,
        brand: product.brand,
        img: product.img,
        describe: product.describe,
        request: {
          type: "GET",
          url: "http://localhost:5000/product/" + product._id,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi" });
  }
};
// [GET] get Product by Id
export const GetproductId = async (req, res) => {
  if (req.params.id === "undefined") {
    res.status(422).json({ msg: "Sản phẩm lỗi" });
    return;
  }
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id).select("name price");
    if (product === null) {
      return res.status(404).json({ msg: "not found" });
    }
    res.status(200).json({
      product: product,
      request: {
        type: "GET",
        url: "http://localhost:5000/product/",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Không có sản phẩm" });
  }
};
// [PATCH] Update Product
export const UpdateproductId = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const productupdate = await ProductModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: data.name,
      price: data.price,
      brand: data.brand,
      img: req.file.path,
      describe: data.describe,
    }
  )
    .then((result) => {
      res.status(200).json("Sửa thành công");
      console.log(result);
    })
    .catch((error) => {
      res.status(500).json("Sửa thất bại");
    });
};
// [DELETE] Delete Product
export const DeleteproductId = async (req, res) => {
  if (typeof req.params.id === "undefined") {
    return res.status(422).json({ message: "Sản phẩm cần xóa không có" });
  }
  let productFind;
  try {
    productFind = await ProductModel.findById(req.params.id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Lỗi tìm kiếm" });
  }
  productFind.remove();
  res.status(200).json({ message: "Xóa sản phẩm thành công" });
};
