import API from "./api";

export const isTokenValid = async (userToken) => {
  try {
    return await API.get(`users/validate-token?token=${userToken}`);
  } catch (error) {
    throw new Error("Error fetching user data", error);
  }
};

export const getUserToken = async (email, password) => {
  try {
    const loginData = {
      email,
      password,
    };
    const response = await API.post(`users/create-token`, loginData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      console.log(error);
      throw new Error("Erro durante login.");
    }
  }
};
