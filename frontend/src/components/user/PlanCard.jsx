import { useNavigate } from "react-router-dom";

const PlanCard = ({ plan }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/plan/${plan._id}`)}
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg"
    >
      <h2 className="font-bold">{plan.prepaidPlans?.[0]?.name || "Plan"}</h2>
      <p>₹{plan.prepaidPlans?.[0]?.price}</p>
    </div>
  );
};

export default PlanCard;