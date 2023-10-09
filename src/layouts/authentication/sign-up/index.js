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

// react-router-dom components
import { Link } from "react-router-dom";
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import TermsAndConditionsModal from "layouts/authentication/sign-up/terms_conditions";

// Images
import bgImage from "assets/images/background.jpg";

// Services
import { registerUser } from "api/auth-service";
import { validateEmail } from "utils/ValidationService";

function Cover() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalTermsAccepted, setModalTermsAccepted] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessageVisible, setAlertMessageVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // corrigir aqui o terms accepted pois só estou utilizando 1
  const handleTermsAccepted = (event) => {
    setTermsAccepted(event.target.checked);
  };
  const handleTermsAccepted2 = () => {
    setModalTermsAccepted(true);
    setTermsAccepted(true);
    setOpen(false);
  };

  const handleAlertMessage = () => {
    setAlertMessageVisible(false);
  };

  const alertContent = (description) => (
    <MDTypography variant="body2" color="white">
      {description}
    </MDTypography>
  );

  const handleRegistration = async (userName, userEmail, userPassword, userTermsAccepted) => {
    if (!userName) {
      setAlertMessage("Por favor, preencha seu nome.");
      setAlertMessageVisible(true);
      return;
    }
    if (!userTermsAccepted) {
      const errorMessage = "Termo de compromisso deve ser aceito.";
      setAlertMessage(errorMessage);
      setAlertMessageVisible(true);
      return;
    }
    if (!validateEmail(userEmail)) {
      setAlertMessage("Email inválido. Por favor, adicione um email válido.");
      setAlertMessageVisible(true);
      return;
    }
    try {
      await registerUser(userName, userEmail, userPassword);
      setAlertMessage(
        "Usuário cadastrado com sucesso. Por gentileza, confirme seu email antes de fazer o login."
      );
      setAlertMessageVisible(true);
    } catch (error) {
      if (error.response.data.type === "userAlreadyExists") {
        const errorMessage = error.response.data.message;
        setAlertMessage(errorMessage);
        setAlertMessageVisible(true);
        return;
      }
      if (error.response.data.type === "invalidPassword") {
        const errorMessage = error.response.data.message;
        setAlertMessage(errorMessage);
        setAlertMessageVisible(true);
        return;
      }
      const errorMessage = "Falha ao cadastrar usuário.";
      setAlertMessage(errorMessage);
      setAlertMessageVisible(true);
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
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Bem vindo
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Digite seu email e senha para cadastrar-se
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nome"
                variant="standard"
                fullWidth
                value={name}
                onChange={handleNameChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type={showPassword ? "text" : "password"}
                label="Senha"
                variant="standard"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-2}>
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
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox onChange={handleTermsAccepted} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Aceito os&nbsp;
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
                onClick={handleOpenModal}
              >
                Termos e Condições
              </MDTypography>
              <TermsAndConditionsModal
                open={open}
                onClose={handleCloseModal}
                onAccept={handleTermsAccepted2}
                checkboxChecked={modalTermsAccepted}
                setCheckboxChecked={setModalTermsAccepted}
                isChecked={modalTermsAccepted}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => handleRegistration(name, email, password, termsAccepted)}
              >
                Cadastrar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Já tem um conta?{" "}
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
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
