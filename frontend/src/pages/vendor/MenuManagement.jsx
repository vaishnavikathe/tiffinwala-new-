import { useState, useEffect } from "react";
import AddMenu from "./AddMenu";
import { getPlans } from "../../services/vendorApi";

const MenuManagement = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 🔥 Fetch plans (ONLY ONCE)
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await getPlans();
        setPlans(res.data.plans || res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlans();
  }, []);

  // 🔥 HANDLE CLICK
  const handleAddMenu = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);  // 👈 force form
  };

  // 🔥 BACK BUTTON
  // const handleBack = () => {
  //   setShowForm(false);
  //   setSelectedPlan(null);
  // };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Menu Management
      </h2>

      {/* ================= PLAN CARDS ================= */}
      {showForm === false && (
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white shadow-md rounded-xl p-5 border"
            >
              <h3 className="text-lg font-bold">
                Plan Type:{plan.planType || plan.name}
              </h3>

              <p className="text-gray-600 mt-2">
                Price: ₹{plan.price}
              </p>

              <p className="text-gray-600">
                Duration: {plan.duration} days
              </p>

              <p className="text-gray-600">
                Meals: {plan.meals}
              </p>

              <button
                onClick={() => handleAddMenu(plan)}
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded"
              >
                Add Menu
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= FORM ================= */}
      {showForm === true && (
        <div>
          {/* <button
            onClick={handleBack}
            className="mb-4 text-blue-500 underline"
          >
            ← Back to Plans
          </button> */}

          <h2 className="text-xl font-semibold mb-4">
            Add Menu for: {selectedPlan?.planType || selectedPlan?.name}
          </h2>

         {selectedPlan && (
  <div className="flex justify-center mt-6">
    <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow relative">

      {/* ❌ Cross Button */}
      <button
  onClick={() => {
    setSelectedPlan(null);
    setShowForm(false);   // 🔥 THIS WAS MISSING
  }}
  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
>
  ✕
</button>

      {/* Form */}
      <AddMenu selectedPlan={selectedPlan} />

    </div>
  </div>
)}
        </div>
      )}

    </div>
  );
};

export default MenuManagement;