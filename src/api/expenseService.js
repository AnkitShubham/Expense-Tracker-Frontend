import axiosInstance from "./axiosInstance";

const expenseService = {
  getExpenses: async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axiosInstance.get(`/v1/getExpenses/${userId}`);
      return response;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw error;
    }
  },

  addExpense: async (expenseData) => {
    try {
      const response = await axiosInstance.post("v1/addExpense", expenseData);
      return response;
    } catch (error) {
      console.error("Error adding expense:", error);
      throw error;
    }
  },

  updateExpense: async (expenseId, expenseData) => {
    try {
      const response = await axiosInstance.put(
        `/v1/updateExpense/${expenseId}`,
        expenseData
      );
      return response;
    } catch (error) {
      console.error("Error updating expense:", error);
      throw error;
    }
  },

  deleteExpense: async (expenseId) => {
    try {
      const response = await axiosInstance.delete(
        `/v1/deleteExpense/${expenseId}`
      );
      return response;
    } catch (error) {
      console.error("Error deleting expense:", error);
      throw error;
    }
  },
  getMonthlyExpenses: async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axiosInstance.get(
        `/v1/getMonthlyExpenses/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching monthly expenses:", error);
      throw error;
    }
  },
  getYearlyExpenses: async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axiosInstance.get(
        `/v1/getYearlyExpenses/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching yearly expenses:", error);
      throw error;
    }
  },
};

export default expenseService;
