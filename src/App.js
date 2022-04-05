import { Switch, Route } from "react-router-dom"
import { useEffect } from "react";
import { useAuthUser } from "@react-query-firebase/auth";
import './App.css';

//  Pages
import Login from "./pages/login"
import DashboardMain from "./pages/dashboard"
import StaffApp from "./pages/staff-app"
import { auth } from "./config/firebase"

const App = () => {
  const user = useAuthUser(["user"], auth);
  if (user.status === "success" && !user.data && window.location.pathname !== "/") {
    window.location.href = "/"
  }
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/dashboard" component={DashboardMain} />
        <Route path="/staff" component={StaffApp} />
      </Switch>
    </>
  );
}

export default App;
