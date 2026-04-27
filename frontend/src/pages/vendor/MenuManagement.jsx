import { useState, useEffect } from "react";
import AddMenu from "./AddMenu";
import { getPlans } from "../../services/vendorApi";

const MenuManagement = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 🔥 Fetch plans
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

  // 🔥 Open form
  const handleAddMenu = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
  };

  // 🔥 Close form
  const handleClose = () => {
    setSelectedPlan(null);
    setShowForm(false);
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Menu Management
      </h2>

      {/* ================= PLAN CARDS ================= */}
      {!showForm && (
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white shadow-md rounded-xl p-5 border"
            >
              {/* ✅ Plan Name */}
              <h3 className="text-lg font-bold">
                {plan.planName|| "No Name"}
              </h3>

              {/* ✅ Plan Type */}
              <p className="text-gray-600 mt-2">
                Type:
                {plan.planTypes?.prepaid && " Prepaid "}
                {plan.planTypes?.postpaid && " Postpaid"}
              </p>

              {/* ✅ Price */}
              <div className="text-gray-600 mt-2">
                Price:
                {plan.planTypes?.prepaid &&
                  plan.prepaidPlans?.map((p, i) => (
                    <div key={i}>₹{p.price}</div>
                  ))}

                {plan.planTypes?.postpaid && (
                  <div>₹{plan.postpaidPlan?.pricePerTiffin}/tiffin</div>
                )}
              </div>

              {/* ✅ Meals */}
              <div className="text-gray-600 mt-2">
                Meals:
                {plan.planTypes?.prepaid &&
                  plan.prepaidPlans?.map((p, i) => (
                    <div key={i}>{p.tiffinCount} meals</div>
                  ))}

                {plan.planTypes?.postpaid && <div>Flexible</div>}
              </div>

              {/* Button */}
              <button
                onClick={() => handleAddMenu(plan)}
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              >
                Add Menu
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= FORM ================= */}
      {showForm && selectedPlan && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Add Menu for: {selectedPlan.planName || "Plan"}
          </h2>

          <div className="flex justify-center mt-6">
            <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow relative">

              {/* ❌ Cross Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              {/* Form */}
              <AddMenu selectedPlan={selectedPlan} />

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MenuManagement;