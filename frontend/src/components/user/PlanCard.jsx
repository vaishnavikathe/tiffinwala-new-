import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const PlanCard = ({
  plan,
  onViewMenu
}) => {

  const navigate = useNavigate();

  return (

    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300">

      {/* PLAN TITLE */}
      <h3 className="text-2xl font-bold text-gray-800">
        {plan.title}
      </h3>

      {/* PRICE */}
      <p className="text-orange-500 text-xl font-semibold mt-2">
        ₹{plan.price}
      </p>

      {/* MEALS */}
      <p className="text-sm text-gray-500 mt-2">
        Meals: {plan.mealCount}
      </p>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mt-2">
        {plan.description}
      </p>

      {/* VIEW MENU */}
      <div className="mt-5">

        <Button
          className="w-full"
          onClick={() => onViewMenu(plan._id)}
        >
          View Menu
        </Button>

      </div>

      {/* PREPAID + POSTPAID */}
      <div className="flex gap-3 mt-4">

        {/* PREPAID */}
        <button
          onClick={() =>
            navigate(
              `/user/plan/${plan._id}?type=prepaid`
            )
          }
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition"
        >
          Prepaid
        </button>

        {/* POSTPAID */}
        <button
          onClick={() =>
            navigate(
              `/user/plan/${plan._id}?type=postpaid`
            )
          }
          className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-xl font-medium transition"
        >
          Postpaid
        </button>

      </div>

    </div>
  );
};

export default PlanCard;