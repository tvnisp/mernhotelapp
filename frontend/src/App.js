import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Private route
import PrivateRoute from "./components/PrivateRoute";

//Registration
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";

//Incidents
import Incidents from "./pages/incidents/Incidents";
import CreateIncident from "./pages/incidents/CreateIncident";
import OpenIncidents from "./pages/incidents/OpenIncidents";
import ClosedIncidents from "./pages/incidents/ClosedIncidents";
import Incident from "./pages/incidents/Incident";

//Handovers
import Handovers from "./pages/handovers/Handovers";
import CreateHandover from "./pages/handovers/CreateHandover";
import DisplayHandovers from "./pages/handovers/DisplayHandovers";

//Plans
import Plans from "./pages/plans/Plans";
import CreatePlan from "./pages/plans/CreatePlan";
import DisplayPlans from "./pages/plans/DisplayPlans";

//About
import About from "./pages/About";

function App() {
  return (
    <>
      <Router>
        <div className=" h-screen flex flex-col">
          <div className="header flex-grow-0">
            <Header />
          </div>
          <div className="main_app flex-grow">
            <Routes>
              {/* Registration */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Main />} />

              {/* Incidents */}
              <Route path="/incidents" element={<PrivateRoute />}>
                <Route path="/incidents" element={<Incidents />} />
              </Route>

              <Route path="/incidents/create" element={<PrivateRoute />}>
                <Route path="/incidents/create" element={<CreateIncident />} />
              </Route>

              <Route path="/incidents/open" element={<PrivateRoute />}>
                <Route path="/incidents/open" element={<OpenIncidents />} />
              </Route>

              <Route path="/incidents/closed" element={<PrivateRoute />}>
                <Route path="/incidents/closed" element={<ClosedIncidents />} />
              </Route>

              <Route path="/incidents/:incidentId" element={<PrivateRoute />}>
                <Route path="/incidents/:incidentId" element={<Incident />} />
              </Route>

              {/* Handovers */}
              <Route path="/handovers" element={<PrivateRoute />}>
                <Route path="/handovers" element={<Handovers />} />
              </Route>

              <Route path="/handovers/create" element={<PrivateRoute />}>
                <Route path="/handovers/create" element={<CreateHandover />} />
              </Route>

              <Route path="/handovers/all" element={<PrivateRoute />}>
                <Route path="/handovers/all" element={<DisplayHandovers />} />
              </Route>

              {/* Plans */}
              <Route path="/plans" element={<PrivateRoute />}>
                <Route path="/plans" element={<Plans />} />
              </Route>

              <Route path="/plans/create" element={<PrivateRoute />}>
                <Route path="/plans/create" element={<CreatePlan />} />
              </Route>

              <Route path="/plans/all" element={<PrivateRoute />}>
                <Route path="/plans/all" element={<DisplayPlans />} />
              </Route>

              {/* About */}
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <div className="footer flex-grow-0">
            <Footer />
          </div>
        </div>
      </Router>
      <ToastContainer position="top-left" />
    </>
  );
}

export default App;
