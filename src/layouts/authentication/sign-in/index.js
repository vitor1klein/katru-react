import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

import BasicLayout from "layouts/authentication/components/BasicLayout";

import bgImage from "assets/images/background.jpg";

import { getUserToken } from "api/auth-service";

function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

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

  const handleLogin = async (userEmail, userPassword) => {
    try {
      const token = await getUserToken(userEmail, userPassword);
      sessionStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      const errorTypes = ["invalidLogin", "userNotActive"];
      if (errorTypes.includes(error.response.data.type)) {
        const errorMessage = error.response.data.message;
        setAlertMessage(errorMessage);
        setAlertMessageVisible(true);
      } else {
        const errorMessage =
          "Falha ao realizar login. Por favor, contate o admnistrador do sistema.";
        setAlertMessage(errorMessage);
        setAlertMessageVisible(true);
      }
    }
  };

  return (
    <BasicLayout image={bgImage}>
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
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Faça seu login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2} ml={0}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </MDBox>
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
            <MDBox display="flex" alignItems="center" ml={0} mb={1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Lembrar-me
              </MDTypography>
            </MDBox>
            <MDBox mt={-5} mb={3} textAlign="right">
              <MDTypography
                component={Link}
                to="/authentication/forgot-password"
                variant="button"
                fontWeight="light"
              >
                Esqueci minha senha
              </MDTypography>
            </MDBox>
            <MDBox mt={1} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => handleLogin(email, password)}
              >
                Entrar
              </MDButton>
            </MDBox>
            <MDBox mt={2} mb={1} textAlign="center">
              <MDTypography variant="button" fontWeight="regular" color="text">
                Ainda não tem uma conta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  fontWeight="medium"
                >
                  Registre-se agora
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
