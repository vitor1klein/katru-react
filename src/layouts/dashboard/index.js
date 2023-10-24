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
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Dashboard() {
  const [projects, setProjects] = useState(["Sua Cidade em Números", "Educação em Números"]);
  const [cities, setCities] = useState(["Curitiba", "Jacarezinho"]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
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

  let content;

  if (loading) {
    content = "Loading user projects...";
  } else if (userProjects.length !== 0) {
    content = "You have no projects assigned to your user, please request one.";
  } else {
    content = (
      <>
        {/* Render filters here */}
        {/* First filter - List of projects */}
        <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
          <option value="">Select a Project</option>
          {projects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>

        {/* Second filter - List of cities */}
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">Select a City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </>
    );
  }

  const listUserProjects = async () => {
    // Replace this with your API call to list user projects
    // Example:
    const response = await fetch("/api/listUserProjects");
    if (!response.ok) {
      throw new Error("Failed to fetch user projects");
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
              <div style={{ height: 300, width: "100%" }}>
                <DataGrid rows={rows} columns={columns} />
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
