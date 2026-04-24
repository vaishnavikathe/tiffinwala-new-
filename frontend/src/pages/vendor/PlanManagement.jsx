import { useState, useEffect } from "react";
import PlanTable from "../../components/vendorDashboard/plan/PlanTable";
import PlanModal from "../../components/vendorDashboard/plan/PlanModal";
import {
  createPlan,
  getPlans,
  deletePlan,
  updatePlan
} from "../../services/vendorApi";

const PlanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH PLANS FROM BACKEND
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await getPlans();
      setPlans(res.data.plans);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  // ✅ CREATE PLAN (API)
  const handleCreate = async (data) => {
    try {
      const res = await createPlan(data);
      setPlans([res.data.plan, ...plans]);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create plan");
    }
  };

  // ✅ UPDATE PLAN
  const handleUpdate = async (updated) => {
    try {
      const res = await updatePlan(updated._id, updated);

      setPlans(plans.map(p =>
        p._id === updated._id ? res.data.plan : p
      ));
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update plan");
    }
  };

  // ✅ DELETE PLAN
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await deletePlan(id);
      setPlans(plans.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete plan");
    }
  };

  return (
    <>
      {/* 🔹 Header (UNCHANGED DESIGN) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Plan Management</h1>

        <button
          onClick={() => {
            setEditPlan(null);
            setIsOpen(true);
          }}
          className="btn-primary"
        >
          + Create Plan
        </button>
      </div>

      {/* 🔹 Table */}
      {loading ? (
        <p>Loading plans...</p>
      ) : (
        <PlanTable
          plans={plans}
          onEdit={(plan) => {
            setEditPlan(plan);
            setIsOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* 🔹 Modal */}
      {isOpen && (
        <PlanModal
          onClose={() => setIsOpen(false)}
          onSubmit={editPlan ? handleUpdate : handleCreate}
          initialData={editPlan}
        />
      )}
    </>
  );
};

export default PlanManagement;