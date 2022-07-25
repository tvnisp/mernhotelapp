import { FaRegCopyright } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-darkBlue flex justify-center items-center">
      <h1 className=" p-8 text-lg text-white font-bold flex justify-center items-center">
        <FaRegCopyright className="mr-2" /> {year} Panagiotis Gkionis. All
        rights reserved.
      </h1>
    </footer>
  );
}
export default Footer;
