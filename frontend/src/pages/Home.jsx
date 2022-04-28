import LinkButton from "../components/LinkButton";

function Home() {
  return (
    <>
      <div className="backButton"></div>
      <div className="container">
        <div className="pt-5 row justify-content-center align-items-center">
          <div className="col-sm-8 col-md-6">
            <h1 className="text-center mt-2">Hotel web application</h1>
            <p className="text-center mt-2">Please choose one of the options</p>
            <div className="d-flex flex-column">
              <LinkButton url="/incidents">Incidents</LinkButton>
              <LinkButton url="#">Handovers (To be implemented)</LinkButton>
              <LinkButton url="#">Work plans (To be implemented)</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
