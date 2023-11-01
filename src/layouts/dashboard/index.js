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

import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
// import { DataGrid, GridRowsProp, GridColDef, nlNL } from "@material-ui/data-grid";
import { DataGrid, ptBR, GridRowsProp, GridColDef } from "@mui/x-data-grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Dashboard() {
  const [projects, setProjects] = useState(["Sua Cidade em Números", "Educação em Números"]);
  const [cities, setCities] = useState(["Curitiba", "Jacarezinho", "Cambará"]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Ano", width: 150 },
    { field: "col2", headerName: "UF", width: 150 },
    { field: "col3", headerName: "Município", width: 150 },
    { field: "col4", headerName: "Entidade", width: 150 },
    { field: "col5", headerName: "Valor", width: 150 },
  ];

  const rows: GridRowsProp = [
    { id: 1, col1: "2021", col2: "PR", col3: "Curitiba", col4: "Pública", col5: "R$ 1540,00" },
    { id: 2, col1: "2021", col2: "PR", col3: "Curitiba", col4: "Estadual", col5: "R$ 800,00" },
    { id: 3, col1: "2021", col2: "PR", col3: "Curitiba", col4: "Municipal", col5: "R$ 140,00" },
    { id: 4, col1: "2021", col2: "PR", col3: "Curitiba", col4: "Total", col5: "R$ 2500,00" },
  ];

  const ITEM_HEIGHT = 50;
  const ITEM_PADDING_TOP = 2;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };

  let content;

  if (loading) {
    content = "Loading user projects...";
  } else if (userProjects.length !== 0) {
    content = "You have no projects assigned to your user, please request one.";
  } else {
    content = (
      <Grid container spacing={5}>
        <Grid item xs={0}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="single-select-project">Projetos</InputLabel>
            <Select
              labelId="single-select-project"
              id="single-select-project"
              value={selectedProject}
              label="Projetos"
              onChange={(e) => setSelectedProject(e.target.value)}
              input={
                <OutlinedInput
                  sx={{ height: 50 }} // Adjust the height as needed
                />
              }
            >
              {projects.map((project) => (
                <MenuItem key={project} value={project}>
                  {project}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-checkbox-municipios">Municípios</InputLabel>
            <Select
              labelId="multiple-checkbox-municipios"
              id="multiple-checkbox-municipios"
              multiple
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              input={<OutlinedInput label="Municípios" sx={{ height: 50 }} />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  <Checkbox checked={selectedCity.indexOf(city) > -1} />
                  <ListItemText primary={city} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }

  const listUserProjects = async () => {
    // Replace this with your API call to list user projects
    // Example:
    const response = await fetch("/api/listUserProjects");
    if (!response.ok) {
      throw new Error("Falha em carregar os projetos do usuário.");
    }
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    // Fetch user projects from the backend
    listUserProjects()
      .then((data) => {
        setUserProjects(data);
        if (data.length === 0) {
          setLoading(false);
        } else {
          // Set initial filter values
          setProjects([...new Set(data.map((project) => project.projectName))]);
          setCities([...new Set(data.map((project) => project.city))]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user projects: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Visualizar Indicadores
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={2} style={{ marginLeft: "50px" }}>
                {content}
              </MDBox>
              <div style={{ height: 500, width: "95%", marginLeft: "30px" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                />
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
