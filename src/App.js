import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import Createset from "./Components/Admin/Createset"
import AdminLogin from "./Components/Admin/AdminLogin";
import Dashboard from "./Components/Admin/AdminDashboard";
import FacultyDashboard from "./Components/Admin/FacultyDashboard";
import FacultyLogin from "./Components/Admin/FacultyLogin";
import DisplayAllCreateset from "./Components/Admin/DisplayAllCreateset";

function App(props) {
  
  return (
    <div>
      <Router>
        <Routes>

          <Route element={< Dashboard />} path={"/admindashboard"} history={props.history}  />
          <Route element={< AdminLogin />} path={"/adminlogin"} history={props.history}  />
          <Route element={< Createset />} path={"/createset"} history={props.history}  />
          <Route element={< FacultyDashboard />} path={"/facultydashboard"} history={props.history}  />
          <Route element={< FacultyLogin />} path={"/facultylogin"} history={props.history}  />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
