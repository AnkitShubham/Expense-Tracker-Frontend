import axiosInstance from "./axiosInstance";

const cardService = {
  getCards: async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is not found in local storage.");
      }
      const response = await axiosInstance.get(`/v1/getCards/${userId}`);
      return response;
    } catch (error) {
      console.error("Error fetching cards:", error);
      throw error;
    }
  },

  addCard: async (cardData) => {
    try {
      const response = await axiosInstance.post("/v1/addCard", cardData);
      return response;
    } catch (error) {
      console.error("Error adding card:", error);
      throw error;
    }
  },

  updateCard: async (cardId, cardData) => {
    try {
      const response = await axiosInstance.put(
        `/v1/updateCard/${cardId}`,
        cardData
      );
      return response;
    } catch (error) {
      console.error("Error updating card:", error);
      throw error;
    }
  },

  deleteCard: async (cardId) => {
    try {
      const response = await axiosInstance.delete(`/v1/deleteCard/${cardId}`);
      return response;
    } catch (error) {
      console.error("Error deleting card:", error);
      throw error;
    }
  },
};

export default cardService;
