/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import logoSuaCidadeEmNumeros from "assets/images/small-logos/logo-asana.svg";
import logoEducacaoEmNumeros from "assets/images/small-logos/github.svg";

export default function data() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Nome", accessor: "project", width: "30%", align: "left" },
      { Header: "Data de Criação", accessor: "dtCreated", align: "center" },
      { Header: "Descrição", accessor: "description", align: "left" },
      { Header: "Ação", accessor: "action", align: "center" },
    ],

    rows: [
      {
        project: <Project image={logoSuaCidadeEmNumeros} name="Sua Cidade em Números" />,
        dtCreated: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            10/01/2021
          </MDTypography>
        ),
        description: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Projeto sua Cidade em Números aborda análises de dados públicos de vários setores da
            economia do seu Município.
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoEducacaoEmNumeros} name="Educação em Números" />,
        dtCreated: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            10/05/2022
          </MDTypography>
        ),
        description: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            O Projeto Educação em Números engloba as principais fontes de dados públicos para Gestão
            Educacional do seu município.
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
    ],
  };
}
