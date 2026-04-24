import PlanRow from "./PlanRow";

const PlanTable = ({ plans, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <table className="w-full text-left">
        
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Sr no</th>
            <th className="p-3">Plan Type</th>
            <th className="p-3">Price</th>
            <th className="p-3">Meals</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {!Array.isArray(plans) || plans.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No Plans Found
              </td>
            </tr>
          ) : (
            plans.map((plan, i) => (
              <PlanRow
                key={plan._id}   // ✅ FIXED
                index={i}
                plan={plan}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default PlanTable;