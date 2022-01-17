import Department from "./Components/Admin/Department";
import DisplayAllDepartment from "./Components/Admin/DisplayAllDepartment";
import Faculty from "./Components/Admin/Faculty"; 
import {BrowserRouter as Router , Route,Routes} from "react-router-dom"
import DisplayAllFaculty from "./Components/Admin/DisplayAllFaculty";
import Courses from "./Components/Admin/Courses";
import Subjects from "./Components/Admin/Subjects";
import DisplayAllCourses from "./Components/Admin/DisplayAllCourses";
import Students from "./Components/Admin/Students";
import DisplayAllStudents from "./Components/Admin/DisplayAllStudents";
import DisplayAllSubjects from "./Components/Admin/DisplayAllSubjects";
import Units from "./Components/Admin/units";
import DisplayAllUnits from "./Components/Admin/DisplayAllUnits";
import DashboardLayout from "./Components/Admin/AdminDashboard"
import AdminLogin from "./Components/Admin/AdminLogin";

function App(props) {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={< Department />} path={"/department"} history={props.history}  />
          <Route element={< DisplayAllDepartment />} path={"/displayalldepartment"} history={props.history}  />
          <Route element={< Faculty />} path={"/faculty"} history={props.history}  />
          <Route element={< DisplayAllFaculty />} path={"/displayallfaculty"} history={props.history}  />
          <Route element={< Courses />} path={"/courses"} history={props.history}  />
          <Route element={< Subjects />} path={"/subjects"} history={props.history}  />
          <Route element={< DisplayAllCourses />} path={"/displayallcourses"} history={props.history}  />
          <Route element={< Students />} path={"/students"} history={props.history}  />
          <Route element={< DisplayAllStudents />} path={"/displayallstudents"} history={props.history}  />
          <Route element={< DisplayAllSubjects />} path={"/displayallsubjects"} history={props.history}  />
          <Route element={< Units />} path={"/units"} history={props.history}  />
          <Route element={< DisplayAllUnits />} path={"/displayallunits"} history={props.history}  />
          <Route element={< DashboardLayout />} path={"/admindashboard"} history={props.history}  />
          <Route element={< AdminLogin />} path={"/adminlogin"} history={props.history}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
