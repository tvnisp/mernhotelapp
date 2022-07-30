import { useSelector } from "react-redux";
import FormButton from "../shared/FormButton";
// import img from "../plans/assets/plan.jpg";

function Plan({ plan, onClick }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="border w-full md:grid grid-cols-4 flex flex-col p-6 rounded-lg bg-veryLightGray gap-x-4">
        <div className="order-2 md:order-1 col-span-3">
          {plan.planImage && plan.planImage.startsWith("up") ? (
            <img
              className="h-80 rounded"
              src={`/${plan.planImage}`}
              alt="Incident"
            />
          ) : (
            <img
              className="h-80 rounded"
              src={`${plan.planImage}`}
              alt="Incident"
            />
          )}
        </div>
        <div className="order-1 md:order-2 w-full mb-4 md:mb-0">
          <div className=" border-b text-left p-1 mb-2 text-2xl text-darkBlue">
            Posted By: {plan.username}
          </div>
          <div className=" bg-brightRedLight rounded mb-1 text-left p-1 text-brightRedSupLight">
            Outlet: {plan.outlet}
          </div>
          <div className=" bg-brightRedSupLight text-left p-1 rounded mb-1 text-darBlue">
            Posted At: {new Date(plan.createdAt).toLocaleString("en-US")}
          </div>
          <div className=" bg-brightRedLight rounded mb-1 text-left p-1 text-brightRedSupLight">
            Description: {plan.description}
          </div>
          <div className="mt-2">
            {(user._id === plan.user || user.rights > 1) && (
              <>
                <FormButton
                  bg={"bg-brightRed"}
                  onClick={(id) => onClick(plan._id)}
                >
                  Delete
                </FormButton>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Plan;
