import BackButton from "../../components/BackButton";
import LinkButton from "../../components/LinkButton";

function IncidentsHome() {
  return (
    <>
      <div className="backButton">
        <BackButton url="/" />
      </div>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-8 col-md-6">
            <h1 className="text-center mt-2">Incident report system</h1>
            <p className="text-center mt-2">Please choose one of the options</p>
            <div className="d-flex flex-column">
              <LinkButton url="/incidents/create">Add new incident</LinkButton>
              <LinkButton url="/incidents/open">Show incidents</LinkButton>
              <LinkButton url="/incidents/closed">Closed incidents</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncidentsHome;
