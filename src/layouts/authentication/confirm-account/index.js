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

// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/background.jpg";
import { confirmAccount } from "api/auth-service";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function ConfirmAccount() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleAlertMessage = () => {
    setAlertMessageVisible(false);
  };

  const alertContent = (description) => (
    <MDTypography variant="body2" color="white">
      {description}
    </MDTypography>
  );

  const handleConfirmAccount = async (userToken) => {
    try {
      const response = await confirmAccount(userToken);
      console.log(response);
      setAlertMessage("Sua conta foi confirmada com sucesso.");
      setAlertMessageVisible(true);
    } catch (error) {
      setAlertMessage(error.response.data);
      setAlertMessageVisible(true);
    }
  };

  const handleSendNewToken = async () => {
    console.log("Enviar novo token ao email do usuário.");
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
            Ativar sua conta
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDTypography variant="button" color="text">
              Clique no botão abaixo para ativar sua conta no Portal Katru.
            </MDTypography>
            <MDBox mt={3} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => handleConfirmAccount(token)}
              >
                Confirmar email
              </MDButton>
            </MDBox>
          </MDBox>
          <br />
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Token expirou e precisa de um novo?
              <br />
              <MDButton
                variant="button"
                color="text"
                fontWeight="small"
                textGradient
                onClick={() => handleSendNewToken()}
              >
                Envie um novo email
              </MDButton>
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default ConfirmAccount;
