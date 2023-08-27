import catgoryModel from "../models/catgoryModel.js";
import slugify from "slugify";

//Create Category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }
    const existingCategory = await catgoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        sucess: true,
        message: "Catgory Already Exist",
      });
    }
    const category = await new catgoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Created Category Success",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: fail,
      error,
      message: "Error Occured",
    });
  }
};

//Update Category

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await catgoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Sucessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error Occured While Updating",
    });
  }
};

//All Category

export const categoryController = async (req, res) => {
  try {
    const category = await catgoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Some Error Occured",
    });
  }
};

//Single Categroy

export const singleCategoryController = async (req, res) => {
  try {
    const singleCategory = await catgoryModel.findOne({
      slug: req.params.slug,
    });
    res.status(200).send({
      success: true,
      message: "Single Category Found",
      singleCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Fetching Single Category",
      error,
    });
  }
};

//Delete Category

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await catgoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Deleting Category",
      error,
    });
  }
};
