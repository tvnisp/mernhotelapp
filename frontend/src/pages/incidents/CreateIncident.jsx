import NewIncident from "../../components/incidents/NewIncident";

function CreateInsident() {
  return (
    <>
      <section id="create_incident_page" className="h-full">
        {/* Flex Container */}
        <div className="container h-full mx-auto px-6 md:space-x-6 space-y-3 md:space-y-0 md:justify-center md:items-center justify-center flex flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-1/2 ">
            <NewIncident />
          </div>
        </div>
      </section>
    </>
  );
}
export default CreateInsident;
