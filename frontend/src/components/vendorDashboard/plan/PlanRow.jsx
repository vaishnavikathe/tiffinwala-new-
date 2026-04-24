import { FiEdit, FiTrash } from "react-icons/fi";

const PlanRow = ({ plan, index, onEdit, onDelete }) => {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      
      {/* Sr No */}
      <td className="p-3">{index + 1}</td>

      {/* Plan Type */}
      <td className="p-3">
        {plan.planTypes?.prepaid && "Prepaid "}
        {plan.planTypes?.postpaid && "Postpaid"}
      </td>

      {/* Price */}
      <td className="p-3">
        {plan.planTypes?.prepaid &&
          plan.prepaidPlans?.map((p, i) => (
            <div key={i}>₹{p.price}</div>
          ))}

        {plan.planTypes?.postpaid && (
          <div>₹{plan.postpaidPlan?.pricePerTiffin}/tiffin</div>
        )}
      </td>

      {/* Meals */}
      <td className="p-3">
        {plan.planTypes?.prepaid &&
          plan.prepaidPlans?.map((p, i) => (
            <div key={i}>{p.tiffinCount} meals</div>
          ))}

        {plan.planTypes?.postpaid && <div>Flexible</div>}
      </td>

      {/* Actions */}
      <td className="p-3 flex gap-3">
        <button
          onClick={() => onEdit(plan)}
          className="text-blue-600 hover:scale-110 transition"
        >
          <FiEdit />
        </button>

        <button
          onClick={() => onDelete(plan._id)}   // ✅ FIXED
          className="text-red-600 hover:scale-110 transition"
        >
          <FiTrash />
        </button>
      </td>

    </tr>
  );
};

export default PlanRow;