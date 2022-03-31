import { Switch, Route } from "react-router-dom"
import { useEffect } from "react";
import { useAuthUser } from "@react-query-firebase/auth";
import './App.css';

//  Pages
import Login from "./pages/login"
import DashboardMain from "./pages/dashboard"
import { auth } from "./config/firebase"
import { useNavigate } from "react-router";

const App = () => {
  const user = useAuthUser(["user"], auth);
  console.log(user);

  if (user.status === "success" && !user.data && window.location.pathname !== "/") {
    window.location.href = "/"
  }
  return (
    <>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/dashboard" component={DashboardMain} />
      </Switch>
    </>
  );
}

export default App;
