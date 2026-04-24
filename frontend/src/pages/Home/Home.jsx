import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FEF9F2]"> {/* Use the soft cream background for the whole page */}

      {/* HERO SECTION - Now blends downward */}
      <section className="relative pt-20 pb-32 px-6 full bg-gradient-to-b from-orange-500 to-red-500">
        <div className="max-w-[1400px] mx-auto text-center">
          
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Fresh Homemade Meals <br /> Delivered Daily
          </h1>
          
          <p className="text-lg md:text-xl text-orange-50 mb-10 max-w-2xl mx-auto">
            Subscribe to healthy, affordable, and hygienic tiffin services near you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/user-login")}
              className="px-10 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-lg hover:bg-orange-50 transition-all transform hover:-translate-y-1"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/vendors")}
              className="px-10 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-orange-600 transition-all transform hover:-translate-y-1"
            >
              Explore Vendors
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - No more "white block" feel */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Why Choose TiffinWala?</h2>
            <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-4 text-lg">Everything you need in one place</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Use your cards here - with a subtle border and shadow */}
             {[
              { icon: "🥕", title: "Healthy & Balanced", desc: "Nutritiously balanced menus for all diet requirements." },
              { icon: "🔄", title: "Flexible Plans", desc: "Customize your meal subscriptions as per your needs." },
              { icon: "⏱️", title: "Reliable Delivery", desc: "Meals delivered hot and on time. Track in real time." },
              { icon: "🏠", title: "Fresh Daily Tiffins", desc: "Hygienic, home-like meals prepared fresh every morning by verified vendors in your area." },
              { icon: "✅", title: "Verified Vendors", desc: " Every vendor on our platform is background-checked and food-safety certified before listing." },
              { icon: "💰", title: "Affordable Plans", desc: "Monthly, weekly, and daily subscriptions starting at just ₹60 per meal. No hidden charges." },

            ].map((feature, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
      </section>
      
    </div>
  );
};

export default Home;