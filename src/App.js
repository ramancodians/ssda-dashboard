import { Switch, Route } from "react-router-dom"
import './App.css';

//  Pages
import Login from "./pages/login"
import DashboardMain from "./pages/dashboard"


function App() {
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
