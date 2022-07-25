import spinner from "./assets/spinner.gif";

function Spinner() {
  return (
    <div className="spinner flex justify-center items-center pt-52">
      <img src={spinner} alt="Spinner" />
    </div>
  );
}
export default Spinner;
