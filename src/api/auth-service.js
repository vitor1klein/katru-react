import API from "./api";

export const registerUser = async (name, email, password) => {
  try {
    const userData = {
      name,
      email,
      password,
      roles: "ROLE_USER",
    };
    const response = await API.post(`auth/register`, userData);
    return response.userData;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      throw new Error("Erro durante o cadastro do usuário.");
    }
  }
};

export const getUserToken = async (email, password) => {
  try {
    const loginData = {
      email,
      password,
    };
    const response = await API.post(`auth/create-token`, loginData);
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

export const isTokenValid = async (userToken) => {
  try {
    return await API.get(`auth/validate-token?token=${userToken}`);
    // template
    // const requestParam = 'paramValue';
    // const requestHeader = {
    //   'Custom-Header': 'headerValue',
    // };
    // const requestBody = {
    //   key1: 'value1',
    //   key2: 'value2',
    // };
    // axios.post(apiUrl, requestBody, {
    //   params: {
    //     param: requestParam,
    //   },
    //   headers: requestHeader,
    // })
  } catch (error) {
    throw new Error("Error fetching user data", error);
  }
};

export const getUserRole = async (userToken) => {
  try {
    return await API.get(`auth/get-user-role?token=${userToken}`);
  } catch (error) {
    throw new Error("Error fetching user data", error);
  }
};

export const forgotPassword = async (email) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Custom-Email-Header": email,
    };
    const response = await API.post(`auth/forgot-password`, { headers });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      console.log(error);
      throw new Error("Erro durante recuperação de senha.");
    }
  }
};

export const updatePassword = async (userToken, userPassword) => {
  try {
    const apiHeaders = {
      "Content-Type": "application/json",
      "Custom-Password-Header": userPassword,
    };
    const apiParams = {
      token: userToken,
    };
    const response = await API.post(`auth/update-password`, null, {
      headers: apiHeaders,
      params: apiParams,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    throw new Error("Erro durante atualização da senha!");
  }
};
