import NewHandover from "../../components/handovers/NewHandover";
import { useState } from "react";
import FormButton from "../../components/shared/FormButton";
import LinkCard from "../../components/shared/LinkCard";

function Handovers() {
  const [createToggle, setCreateToggle] = useState(false);

  const handleCreateToggle = () => {
    setCreateToggle((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <section id="handovers_page" className="h-full">
        {/* Flex Container */}
        <div className="container mb-32 md:mb-0 h-full mx-auto px-6 md:space-x-6 space-y-3 md:space-y-0 md:justify-around md:items-center justify-center flex flex-col md:flex-row">
          <div className="md:hidden flex flex-col space-y-3">
            <h1 className="text-3xl font-bold text-center">Handovers</h1>
            <FormButton onClick={handleCreateToggle}>Add a Handover</FormButton>
            {createToggle && <NewHandover />}
          </div>
          <div className="hidden md:flex flex-col w-full md:w-1/3">
            <NewHandover />
          </div>
          <div className="md:border-l-2 md:h-2/3 border-darkBlue md:flex flex-col justify-center space-y-3 md:space-y-20 w-full md:w-1/2">
            <div className="flex flex-col w-full items-center space-y-4 md:space-y-20">
              <LinkCard to="/handovers/all">Handovers</LinkCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Handovers;
