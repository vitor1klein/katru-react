import API from "./api";

export const getUserData = async (userId) => {
  try {
    const response = await API.get(`users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user data", error);
  }
};
