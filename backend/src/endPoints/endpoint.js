import express from "express";
import { ProductModel } from "../Model_Schema/modelSchema.js";

// custom middleware
export const validateInputs = (req, res, next) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "please fill all required fields" });
  }
  req.product = req.body;
  next();
};

// Get request

export const getProduct = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({ message: "products not found" });
    }
    return res.status(200).json({ status: "success", data: products });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get single data

export const SingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ status: "success", data: product });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
};

// post request
export const addProduct = async (req, res) => {
  const newProduct = new ProductModel(req.product);
  try {
    await newProduct.save();
    res.status(201).json({ status: "success", data: newProduct });
  } catch (err) {
    console.log("failed to create new product");
    res.status(500).json({ message: "internal error" });
  }
};

export const addManyProduct = async (req, res) => {
  const addedProd = req.body;
  if (!Array.isArray(addedProd)) {
    return res.status(400).json({ message: "invalid input" });
  }
  try {
    const products = await ProductModel.insertMany(req.body);
    res.status(201).json({ status: "success", data: products });
  } catch (err) {
    console.error("internal error");
    res.status(500).json({ message: "internal error" });
  }
};

// patch request

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateProduct) {
      return res.status(404).json({ message: "invalid product" });
    }
    return res.status(200).json({ status: "success", data: updateProduct });
  } catch (err) {
    console.log("failed to update");
    res.status(500).json({ message: "internal error" });
  }
};

// delete request
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProd = await ProductModel.findByIdAndDelete(id);
    if (!deleteProd) {
      return res.status(404).json({ message: "product not found" });
    }
    return res.status(204).send();
  } catch (err) {
    console.log("internal error");
    res.status(500).json({ message: "internal error" });
  }
};
