import Footer from "../../components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Content */}
      <div className="flex-grow">
        <div className="section">
          <div className="container-custom max-w-4xl text-center">

            <h1 className="heading">
              About TiffinWala
            </h1>

            <p className="subheading">
              Making daily meals simple, healthy, and reliable
            </p>

            <div className="mt-10 space-y-6 text-gray-700 leading-relaxed text-left">

              <p>
                TiffinWala is a smart subscription-based meal management platform
                designed to connect users with trusted local tiffin providers.
              </p>

              <p>
                We understand the challenges of maintaining a healthy diet in a
                busy lifestyle.
              </p>

              <p>
                Whether you're a student, working professional, or vendor,
                TiffinWala provides a seamless experience.
              </p>

            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">

              <div className="card text-center">
                <h3 className="font-semibold text-lg">🚩 Our Mission</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  To make healthy meals accessible and affordable for everyone.
                </p>
              </div>

              <div className="card text-center">
                <h3 className="font-semibold text-lg">🎯 Our Vision</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  To become the most trusted meal subscription platform.
                </p>
              </div>

              <div className="card text-center">
                <h3 className="font-semibold text-lg">🤝 Our Values</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Quality, reliability, and customer satisfaction.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

      

    </div>
  );
};

export default About;