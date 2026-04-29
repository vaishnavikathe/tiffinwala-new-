import Button from "../ui/Button";

const PlanCard = ({ plan, onSubscribe, onViewMenu }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition space-y-3">
      
      <h2 className="text-lg font-semibold">
        {plan.name || "Meal Plan"}
      </h2>

      <p className="text-gray-600">
        ₹{plan.price} / {plan.duration || "month"}
      </p>

      <div className="flex gap-2">
        <Button onClick={() => onSubscribe(plan._id)}>
          Subscribe
        </Button>

        <Button
          variant="outline"
          onClick={() => onViewMenu(plan._id)}
        >
          View Menu
        </Button>
      </div>

    </div>
  );
};

export default PlanCard;