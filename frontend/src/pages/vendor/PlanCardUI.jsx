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

  const filteredMenus = menus.filter(
    (m) =>
      m.planId?._id?.toString() === plan._id?.toString()
  );

  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      
      {/* Plan Info */}
      <h3 className="text-xl font-bold text-gray-800">
        {plan.planName || "No Name"}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {plan.planTypes?.prepaid && "Prepaid"}
        {plan.planTypes?.postpaid && " / Postpaid"}
      </p>

      <div className="text-gray-600 mt-2 text-sm">
        Price:
        {plan.planTypes?.prepaid &&
          plan.prepaidPlans?.map((p, i) => (
            <div key={i}>₹{p.price}</div>
          ))}
      </div>

      {/* 🔥 Buttons */}
      <div className="mt-5 flex gap-2 items-center">
        
        {/* Add */}
        <button
          onClick={() => handleAddMenu(plan)}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
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
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            ⋮
          </button>

          {/* Dropdown Menu */}
          {openMenuId === plan._id && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-xl shadow-lg z-10 overflow-hidden">
              
              <button
                onClick={() => {
                  handleView(plan._id);
                  setOpenMenuId(null);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                👁 View Menu
              </button>

              <button
                onClick={() => {
                  const menu = filteredMenus[0];

                  if (menu) {
                    handleEdit(menu);
                  } else {
                    alert("No menu found for this plan");
                  }

                  setOpenMenuId(null);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                ✏️ Edit Menu
              </button>

            </div>
          )}
        </div>
      </div>

      {/* 👁 Show Menu */}
      {activeMenuId === plan._id && (
        <div className="mt-4 bg-gray-50 rounded-xl p-4 space-y-3">
          
          {filteredMenus.length === 0 ? (
            <p className="text-sm text-gray-400">
              No menu added yet
            </p>
          ) : (
            filteredMenus.map((menu) => (
              <div
                key={menu._id}
                className="bg-white rounded-lg p-3 shadow-sm border"
              >
                <p className="font-semibold text-gray-700">
                  {menu.day} • {menu.mealType}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {menu.items?.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PlanCardUI;