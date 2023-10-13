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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import MDInput from "components/MDInput";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/background.jpg";
import { resendToken } from "api/auth-service";
import { useState } from "react";

function ResendToken() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);
  const [email, setEmail] = useState("");

  const handleAlertMessage = () => {
    setAlertMessageVisible(false);
  };

  const alertContent = (description) => (
    <MDTypography variant="body2" color="white">
      {description}
    </MDTypography>
  );

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendNewToken = async (userEmail) => {
    try {
      console.log("Chamando api com email ", userEmail);
      const response = await resendToken(userEmail);
      console.log(response);
      setAlertMessage("Um novo email foi enviado para confirmar sua conta.");
      setAlertMessageVisible(true);
    } catch (error) {
      console.log(error);
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
            Reenviar email
          </MDTypography>
        </MDBox>
        <MDBox pt={2} pb={3} px={3}>
          <MDBox component="form" role="form" textAlign="center">
            <MDTypography variant="button" color="text">
              Insira o email cadastrado para receber um novo email de confirmação de sua conta:
            </MDTypography>
            <br />
            <MDBox mb={5} ml={0}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </MDBox>
            <MDBox mt={5} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => handleSendNewToken(email)}
              >
                Enviar novo email
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default ResendToken;
