import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import IncidentsHome from "./pages/incident/IncidentsHome";
import NewIncident from "./pages/incident/NewIncident";
import Incidents from "./pages/incident/Incidents";
import Incident from "./pages/incident/Incident";
import Closed from "./pages/incident/Closed";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <div className="container-fluid">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
          </Routes>

          <Footer />
        </div>
      </Router>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
