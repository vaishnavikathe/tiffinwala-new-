// src/components/user/PlanCard.jsx

import Button from "../ui/Button";

const PlanCard = ({ plan, onSubscribe, onViewMenu }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
      
      <h3 className="text-lg font-semibold">
        {plan.title}
      </h3>

      <p className="text-gray-600">
        ₹{plan.price}
      </p>

      <p className="text-sm text-gray-500">
        Meals: {plan.mealCount}
      </p>

      <p className="text-sm text-gray-500">
        {plan.description}
      </p>

      <div className="flex gap-3 mt-4">
        <Button
          className="flex-1"
          onClick={() => onViewMenu(plan._id)}
        >
          View Menu
        </Button>

        <Button
          className="flex-1 bg-green-500 hover:bg-green-600"
          onClick={() => onSubscribe(plan._id)}
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;