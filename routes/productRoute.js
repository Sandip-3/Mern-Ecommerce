import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  allProductController,
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  productCategoryController,
  productControllerList,
  productCountController,
  productFiltersController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  singleProductController,
  updateProductController,
} from "../controller/productController.js";
import formidable from "express-formidable";
import braintree from "braintree";

const router = express.Router();

//route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//Update
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//All Product List

router.get("/get-product", allProductController);

//Single
router.get("/get-product/:slug", singleProductController);

//Photo Route
router.get("/product-photo/:pid", productPhotoController);

//Delete
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//Filter
router.post("/product-filters", productFiltersController);

//Product count
router.get("/product-count", productCountController);

//Product Per Page
router.get("/product-list/:page", productControllerList);

//search
router.get("/search/:keywords", searchProductController);

//Recommendation
router.get("/related-product/:pid/:cid", relatedProductController);

//Category Wise
router.get("/product-category/:slug", productCategoryController);

//Payment route
router.get('/braintree/token' , braintreeTokenController)

//Payment
router.post('/braintree/payment' , requireSignIn , braintreePaymentController)

export default router;
