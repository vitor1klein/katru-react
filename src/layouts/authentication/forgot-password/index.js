/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/background.jpg";

import { forgotPassword } from "api/auth-service";
import { useState } from "react";

function Cover() {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);
  const successfulMessage =
    "Um email para recuperação de senha foi enviado à sua caixa de mensagem. Favor seguir instruções enviadas no email.";

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAlertMessage = () => {
    setAlertMessageVisible(false);
  };

  const alertContent = (description) => (
    <MDTypography variant="body2" color="white">
      {description}
    </MDTypography>
  );

  const handleForgotPassword = async (userEmail) => {
    try {
      const response = await forgotPassword(userEmail);
      console.log(response);
      setAlertMessage(successfulMessage);
      setAlertMessageVisible(true);
    } catch (error) {
      setAlertMessage(error.message);
      setAlertMessageVisible(true);
    }
  };

  return (
    <BasicLayout coverHeight="50vh" image={bgImage}>
      <Card>
        {alertMessageVisible && (
          <MDAlert color="warning" dismissible onClose={handleAlertMessage}>
            {alertContent(alertMessage)}
          </MDAlert>
        )}
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Esqueci minha Senha
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Adicione seu email abaixo para recuperar sua senha.
            <br />
            Você receberá um link em sua caixa de entrada.
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => handleForgotPassword(email)}
              >
                Recuperar Senha
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox mt={3} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
            Lembrou a senha?{" "}
            <MDTypography
              component={Link}
              to="/sign-in"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Faça Login
            </MDTypography>
          </MDTypography>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
