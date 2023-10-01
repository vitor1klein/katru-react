import API from "./api";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXRvckBrZGF0YWJpLmNvbSIsImlhdCI6MTY4Mjg4MjQ3NSwiZXhwIjoxNjgyODgzOTE1fQ.ksaWSagmDm4BsEVVCoZld6HX8hF88k6kzZrWQGqwPY4";

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

export const registerUser = async (name, email, password) => {
  try {
    const userData = {
      name,
      email,
      password,
      roles: "ROLE_USER",
    };
    const response = await API.post(`users/register`, userData);
    return response.userData;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      throw new Error("Erro durante o cadastro do usuário.");
    }
  }
};
