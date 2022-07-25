import Me from "../components/shared/assets/me.jpg";

function About() {
  return (
    <>
      <section id="about_page" className="h-full">
        <div className="container h-full xl:w-2/3 mx-auto px-6 space-y-2 items-center justify-center flex flex-col">
          <h2 className="text-4xl font-bold mb-10">About</h2>
          <div className="border w-full flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray">
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-6 md:space-y-0">
              <div className="md:w-1/5 flex justify-center">
                <img
                  className="border-2 border-darkBlue rounded-lg md:rounded-full w-40 md:w-full md:mt-0 -mt-14"
                  src={Me}
                  alt="Me"
                  loading="lazy"
                />
              </div>
              <div className="md:w-4/5 flex items-center">
                <p className="font-mono text-sm md:text-lg">
                  My name is Panagiotis Gkionis, and I am a last year student at
                  the Open University. This application was developed for my
                  thesis project. I was focused on improving the internal
                  communications and operational management in the Hotel
                  industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default About;
