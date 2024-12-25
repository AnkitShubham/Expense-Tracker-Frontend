import axiosInstance from "./axiosInstance";

const userService = {
  getUserData: async (email) => {
    try {
      const response = await axiosInstance.get(
        `/v1/getUserDetails?email=${email}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },
};

export default userService;
