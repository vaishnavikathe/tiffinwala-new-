import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

const EditMealPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= FETCH EXISTING PLAN =================
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await API.get(`/plan/${id}`);
        setFormData(res.data.plan);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlan();
  }, [id]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put(`/plan/${id}`, formData);

      alert("Plan updated successfully");
      navigate("/vendor/dashboard");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section flex justify-center items-center">
      <div className="form-card w-full max-w-md">

        <h2 className="heading text-center mb-4">
          Edit Meal Plan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Plan Name"
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (e.g. 30 days)"
            className="w-full p-3 border rounded"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded"
            rows={3}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Updating..." : "Update Plan"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditMealPlan;