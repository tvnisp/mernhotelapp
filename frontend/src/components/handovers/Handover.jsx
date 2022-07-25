import { useSelector } from "react-redux";
import FormButton from "../shared/FormButton";

function Handover({ handover, onClick }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="border w-full flex flex-col p-6 rounded-lg bg-veryLightGray">
        <div className=" border-b text-left p-1 mb-2 text-2xl text-darkBlue">
          Employee: {handover.username}
        </div>
        <div className=" bg-brightRedLight rounded mb-1 text-left p-1 text-brightRedSupLight">
          Outlet: {handover.outlet}
        </div>
        <div className=" bg-brightRedSupLight text-left p-1 rounded mb-1 text-darBlue">
          Shift: {handover.shift}
        </div>
        <div className=" bg-brightRedLight rounded mb-1 text-left p-1 text-brightRedSupLight">
          Description: {handover.handoverDescription}
        </div>
        <div className=" bg-brightRedSupLight text-left p-1 rounded mb-1 text-darBlue">
          Date: {new Date(handover.createdAt).toLocaleString("en-US")}
        </div>
        <div className="mt-2">
          {(user._id === handover.user || user.rights > 1) && (
            <>
              <FormButton
                bg={"bg-brightRed"}
                onClick={(id) => onClick(handover._id)}
              >
                Delete
              </FormButton>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Handover;
