import NewPlan from "../../components/plans/NewPlan";
import { useState } from "react";
import FormButton from "../../components/shared/FormButton";
import LinkCard from "../../components/shared/LinkCard";

function Plans() {
  const [createToggle, setCreateToggle] = useState(false);

  const handleCreateToggle = () => {
    setCreateToggle((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <section id="plans_page" className="h-full">
        {/* Flex Container */}
        <div className="container mb-32 md:mb-0 h-full mx-auto px-6 md:space-x-6 space-y-3 md:space-y-0 md:justify-around justify-center md:items-center flex flex-col md:flex-row">
          <div className="md:hidden flex flex-col space-y-3">
            <h1 className="text-3xl font-bold text-center">Plans</h1>
            <FormButton onClick={handleCreateToggle}>Add a Plan</FormButton>
            {createToggle && <NewPlan />}
          </div>
          <div className="hidden md:flex flex-col w-full md:w-1/3">
            <NewPlan />
          </div>
          <div className="md:border-l-2 md:h-2/3 border-darkBlue md:flex flex-col justify-center space-y-3 md:space-y-20 w-full md:w-1/2">
            <div className="flex flex-col w-full items-center space-y-4 md:space-y-20">
              <LinkCard to="/plans/all">Plans</LinkCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Plans;
