import { useState } from "react";

const PlanCardUI = ({
  plan,
  menus,
  handleAddMenu,
  handleView,
  handleEdit,
  activeMenuId
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  console.log("PLAN ID:", plan._id);
console.log("MENUS:", menus);

  return (
    <div className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition">
      
      {/* Plan Info */}
      <h3 className="text-lg font-bold">
        {plan.planName || "No Name"}
      </h3>

      <p className="text-gray-600 mt-2">
        Type:
        {plan.planTypes?.prepaid && " Prepaid "}
        {plan.planTypes?.postpaid && " Postpaid"}
      </p>

      <div className="text-gray-600 mt-2">
        Price:
        {plan.planTypes?.prepaid &&
          plan.prepaidPlans?.map((p, i) => (
            <div key={i}>₹{p.price}</div>
          ))}
      </div>

      {/* 🔥 Buttons */}
      <div className="mt-4 flex gap-2">
        
        {/* Add */}
        <button
          onClick={() => handleAddMenu(plan)}
          className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          + Add Menu
        </button>

        {/* ⋮ Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(
                openMenuId === plan._id ? null : plan._id
              );
            }}
            className="px-3 bg-gray-200 rounded hover:bg-gray-300"
          >
            ⋮
          </button>

          {openMenuId === plan._id && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
              
              <button
                onClick={() => {
                  handleView(plan._id);
                  setOpenMenuId(null);
                }}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                👁 View
              </button>

              <button
                onClick={() => {
                  const menu = menus.find(
                    m => m.planId?.toString() === plan._id?.toString()
                  );

                  if (menu) {
                    handleEdit(menu);
                  } else {
                    alert("No menu found");
                  }

                  setOpenMenuId(null);
                }}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                ✏️ Edit
              </button>

            </div>
          )}
        </div>
      </div>

      {/* 👁 Show Menu */}
      {activeMenuId === plan._id && (
        <div className="mt-3 border-t pt-3">
          {menus
            .filter(m => m.planId?.toString() === plan._id?.toString())
            .map(menu => (
              <div key={menu._id} className="mb-2">
                <p className="font-semibold">
                  {menu.day} ({menu.mealType})
                </p>

                <ul className="ml-4 list-disc text-sm">
                  {menu.items?.map((item, i) => (
                    <li key={i}>
                      {item.name} ({item.type})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PlanCardUI;