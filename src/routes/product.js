const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { createProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts, updateProductStatus } = require("../controller/product");
// const { addCategory, getCategories } = require('../controller/category');
const multer = require("multer");
const path = require("path");

const router = express.Router();
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/product/create",requireSignin,adminMiddleware,upload.array("productPicture"),createProduct);
router.get("/products/:slug", getProductsBySlug);
router.get("/product/:productId",getProductDetailsById)
router.delete("/product/deleteProductById",requireSignin,adminMiddleware,deleteProductById);
router.post("/product/getProducts",requireSignin,adminMiddleware,getProducts);
router.put('/product/:productId/updateProductStatus', requireSignin, adminMiddleware, updateProductStatus);


module.exports = router;
