import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Registration
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

//Incidents
import IncidentsHome from "./pages/incident/IncidentsHome";
import NewIncident from "./pages/incident/NewIncident";
import Incidents from "./pages/incident/Incidents";
import Incident from "./pages/incident/Incident";
import Closed from "./pages/incident/Closed";

//Handovers
import NewHandover from "./pages/handover/NewHandover";
import Handovers from "./pages/handover/Handovers";
import HandoversHome from "./pages/handover/HandoversHome";

//Plans
import NewPlan from "./pages/plan/NewPlan";
import Plans from "./pages/plan/Plans";
import PlansHome from "./pages/plan/PlansHome";

//Private route
import PrivateRoute from "./components/PrivateRoute";

//Shared
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <div className="container-fluid">
          <Header />

          <Routes>
            {/* Home page */}
            <Route path="/" element={<Home />} />
            {/*Login page */}
            <Route path="/login" element={<Login />} />
            {/* Register page */}
            <Route path="/register" element={<Register />} />

            {/* Incidents routes */}
            <Route path="/incidents" element={<IncidentsHome />} />

            <Route path="/incidents/create" element={<PrivateRoute />}>
              <Route path="/incidents/create" element={<NewIncident />} />
            </Route>

            <Route path="/incidents/closed" element={<PrivateRoute />}>
              <Route path="/incidents/closed" element={<Closed />} />
            </Route>

            <Route path="/incidents/open" element={<PrivateRoute />}>
              <Route path="/incidents/open" element={<Incidents />} />
            </Route>

            <Route path="/incidents/:incidentId" element={<Incident />}>
              <Route path="/incidents/:incidentId" element={<Incident />} />
            </Route>

            {/* Handovers routes */}
            <Route path="/handovers" element={<HandoversHome />} />

            <Route path="/handovers/all" element={<PrivateRoute />}>
              <Route path="/handovers/all" element={<Handovers />} />
            </Route>

            <Route path="/handovers/create" element={<PrivateRoute />}>
              <Route path="/handovers/create" element={<NewHandover />} />
            </Route>

            {/* Plans routes */}
            <Route path="/plans" element={<PlansHome />} />

            <Route path="/plans/all" element={<PrivateRoute />}>
              <Route path="/plans/all" element={<Plans />} />
            </Route>

            <Route path="/plans/create" element={<PrivateRoute />}>
              <Route path="/plans/create" element={<NewPlan />} />
            </Route>
          </Routes>

          <Footer />
        </div>
      </Router>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
