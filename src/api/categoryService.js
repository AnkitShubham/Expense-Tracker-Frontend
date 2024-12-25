import axiosInstance from "./axiosInstance";

const categoryService = {
  addCategory: async (categoryData) => {
    try {
      const response = await axiosInstance.post(
        "/v1/addCategory",
        categoryData
      );
      return response;
    } catch (error) {
      console.error("Error adding category", error);
      throw error;
    }
  },
  getCategories: async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axiosInstance.get(`/v1/getCategories/${userId}`);
      return response;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  deleteCategory: async (categoryId) => {
    try {
      const response = await axiosInstance.delete(
        `/v1/deleteCategory/${categoryId}`
      );
      return response;
    } catch (error) {
      console.error("Error deleting category", error);
      throw error;
    }
  },
};

export default categoryService;
