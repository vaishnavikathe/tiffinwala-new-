import { useState, useEffect } from "react";
import AddMenu from "./AddMenu";
import { getPlans, getMenus } from "../../services/vendorApi";
import PlanCardUI from "./PlanCardUI";

const MenuManagement = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [menus, setMenus] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editMenu, setEditMenu] = useState(null);

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

  // 🔥 Fetch menus
  const fetchMenus = async () => {
    try {
      const res = await getMenus();
      console.log("MENU API RESPONSE:", res.data); // ✅ correct logging
      setMenus(res.data.menus || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  const loadMenus = async () => {
    try {
      const res = await getMenus();
      console.log("MENU API RESPONSE:", res.data);
      setMenus(res.data.menus || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  loadMenus();
}, []);

  // 🔥 Open Add Menu
  const handleAddMenu = (plan) => {
    setSelectedPlan(plan);
    setEditMenu(null); // reset edit
    setShowForm(true);
  };

  // 🔥 View Menu
  const handleView = (id) => {
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  // 🔥 Edit Menu
  const handleEdit = (menu) => {
    const plan = plans.find(
      (p) =>
        p._id?.toString() ===
        (menu.planId?._id?.toString() || menu.planId?.toString())
    );
    setSelectedPlan(plan);
    setEditMenu(menu);
    setShowForm(true);
  };

  // 🔥 Close form
  const handleClose = () => {
    setSelectedPlan(null);
    setShowForm(false);
    setEditMenu(null);
  };

  // 🔥 Refresh after add/edit
  const handleRefresh = async () => {
    await fetchMenus();
    handleClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Menu Management</h2>

      {/* ================= PLAN CARDS ================= */}
      {!showForm && (
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCardUI
              key={plan._id}
              plan={plan}
              menus={menus}
              handleAddMenu={handleAddMenu}
              handleView={handleView}
              handleEdit={handleEdit}
              activeMenuId={activeMenuId}
            />
          ))}
        </div>
      )}

      {/* ================= FORM ================= */}
      {showForm && selectedPlan && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editMenu ? "Edit Menu" : "Add Menu"} for:{" "}
            {selectedPlan.planName || "Plan"}
          </h2>

          <div className="flex justify-center mt-6">
            <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow relative">
              
              {/* ❌ Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              {/* Form */}
              <AddMenu
                selectedPlan={selectedPlan}
                editMenu={editMenu}
                fetchMenus={handleRefresh}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;