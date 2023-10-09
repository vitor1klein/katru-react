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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tabelas from "layouts/tabelas";
import Profile from "layouts/profile";
import Admin from "layouts/admin";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ForgotPassword from "layouts/authentication/forgot-password";
import ConfirmAccount from "layouts/authentication/confirm-account";
import UpdatePassword from "layouts/authentication/update-password";
import Unauthorized from "layouts/authentication/unauthorized";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Admin",
    key: "admin",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/admin",
    component: <Admin />,
    roleRequired: "ROLE_ADMIN",
  },
  {
    type: "collapse",
    name: "Perfil",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    roleRequired: "ROLE_USER",
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    roleRequired: "ROLE_USER",
  },
  {
    type: "collapse",
    name: "Tabelas",
    key: "tabelas",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tabelas",
    component: <Tabelas />,
    roleRequired: "ROLE_USER",
  },
  {
    name: "Sign In",
    key: "signIn",
    route: "/sign-in",
    component: <SignIn />,
    public: true,
  },
  {
    name: "Sign Up",
    key: "signUp",
    route: "/sign-up",
    component: <SignUp />,
    public: true,
  },
  {
    name: "Confirm Account",
    key: "confirmAccount",
    route: "/confirm-account",
    component: <ConfirmAccount />,
    public: true,
  },
  {
    name: "Forgot Password",
    key: "forgotPassword",
    route: "/forgot-password",
    component: <ForgotPassword />,
    public: true,
  },
  {
    name: "Update Password",
    key: "updatePassword",
    route: "/update-password",
    component: <UpdatePassword />,
    public: true,
  },
  {
    name: "Unauthorized",
    key: "unauthorized",
    route: "/unauthorized",
    component: <Unauthorized />,
    roleRequired: "ROLE_USER",
  },
];

export default routes;
