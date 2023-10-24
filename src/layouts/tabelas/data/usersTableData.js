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
import MDTypography from "components/MDTypography";

export default function data() {
  return {
    columns: [
      { Header: "Nome", accessor: "userName", width: "30%", align: "left" },
      { Header: "Data de Criação", accessor: "dtCreated", align: "center" },
      { Header: "Status", accessor: "status", align: "left" },
      { Header: "Ação", accessor: "action", align: "center" },
    ],

    rows: [
      {
        userName: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Usuário 1
          </MDTypography>
        ),
        dtCreated: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            10/01/2021
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Ativo
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        userName: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Usuário 2
          </MDTypography>
        ),
        dtCreated: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            10/02/2022
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Inativo
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
