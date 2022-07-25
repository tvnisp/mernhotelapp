import NewPlan from "../../components/plans/NewPlan";

function CreatePlan() {
  return (
    <>
      <section id="create_plan_page" className="h-full">
        {/* Flex Container */}
        <div className="container h-full mx-auto px-6 md:space-x-6 space-y-3 md:space-y-0 md:justify-center md:items-center justify-center flex flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-1/2 ">
            <NewPlan />
          </div>
        </div>
      </section>
    </>
  );
}
export default CreatePlan;
