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
            <h1 className="text-center mt-2">Handover section</h1>
            <p className="text-center mt-2">Please choose one of the options</p>
            <div className="d-flex flex-column">
              <LinkButton url="/handovers/create">Add new handover</LinkButton>
              <LinkButton url="/handovers/all">Show handovers</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncidentsHome;
