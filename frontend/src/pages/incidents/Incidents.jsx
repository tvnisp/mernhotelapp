import NewIncident from "../../components/incidents/NewIncident";
import { useState } from "react";
import FormButton from "../../components/shared/FormButton";
import LinkCard from "../../components/shared/LinkCard";

function Incidents() {
  const [createToggle, setCreateToggle] = useState(false);

  const handleCreateToggle = () => {
    setCreateToggle((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <section id="incidents_page" className="h-full">
        {/* Flex Container */}
        <div className="container mb-32 md:mb-0 h-full mx-auto px-6 md:space-x-6 space-y-3 md:space-y-0 md:justify-around justify-center md:items-center flex flex-col md:flex-row">
          <div className="md:hidden flex flex-col space-y-3">
            <h1 className="text-3xl font-bold text-center">Incidents</h1>
            <FormButton onClick={handleCreateToggle}>
              Add an Incident
            </FormButton>
            {createToggle && <NewIncident />}
          </div>
          <div className="hidden md:flex flex-col md:mb-32 w-full md:w-1/3 justify-center">
            <NewIncident />
          </div>
          <div className="md:border-l-2 md:h-2/3 border-darkBlue md:flex flex-col justify-center space-y-3 md:space-y-20 w-full md:w-1/2">
            <div className="flex flex-col w-full items-center space-y-4 md:space-y-20">
              <LinkCard to="/incidents/open">Current Incidents</LinkCard>
              <LinkCard to="/incidents/closed">Closed Incidents</LinkCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Incidents;
