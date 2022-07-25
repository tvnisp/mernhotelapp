import NewHandover from "../../components/handovers/NewHandover";

function CreateInsident() {
  return (
    <>
      <section id="create_handover_page" className="h-full">
        {/* Flex Container */}
        <div className="container h-full mx-auto px-6 md:space-x-6 space-y-3 md:space-y-0 md:justify-center md:items-center justify-center flex flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-1/2 ">
            <NewHandover />
          </div>
        </div>
      </section>
    </>
  );
}
export default CreateInsident;
