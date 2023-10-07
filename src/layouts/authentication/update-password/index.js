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
import { useState } from "react";
import { useLocation } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/background.jpg";

// API calls
import { updatePassword } from "api/auth-service";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAlertMessage = () => {
    setAlertMessageVisible(false);
  };

  const alertContent = (description) => (
    <MDTypography variant="body2" color="white">
      {description}
    </MDTypography>
  );

  const handlePasswordUpdate = async (userToken, userPassword) => {
    try {
      await updatePassword(userToken, userPassword);
      setAlertMessage("Sua senha foi alterada com sucesso!");
      setAlertMessageVisible(true);
    } catch (error) {
      const errorMessage = "ERRO DURANTE ATUALIZAÇÃO DA SENHA!";
      setAlertMessage(errorMessage);
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
            Atualizar senha
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Por favor, adicione sua nova senha no campo abaixo.
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={1} ml={0}>
              <MDInput
                type={showPassword ? "text" : "password"}
                label="Senha"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
              />
              <Switch checked={showPassword} onChange={handleShowPassword} color="primary" />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleShowPassword}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Mostrar senha
              </MDTypography>
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => handlePasswordUpdate(token, password)}
              >
                Atualizar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default UpdatePassword;
