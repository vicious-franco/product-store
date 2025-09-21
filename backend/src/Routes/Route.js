import express from "express";
import {
  addManyProduct,
  addProduct,
  deleteProduct,
  getProduct,
  SingleProduct,
  updateProduct,
  validateInputs,
} from "../endPoints/endpoint.js";

// routes
const Router = express.Router();
Router.route("/").post(validateInputs, addProduct).get(getProduct);
Router.route("/many").post(addManyProduct);
Router.route("/:id")
  .patch(updateProduct)
  .delete(deleteProduct)
  .get(SingleProduct);

export default Router;
