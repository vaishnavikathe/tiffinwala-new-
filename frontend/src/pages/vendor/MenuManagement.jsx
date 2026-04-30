import { useEffect, useState } from "react";
import { getPlans, getMenus, addMenu, updateMenu } from "../../services/vendorApi";
import toast from "react-hot-toast";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const MenuManagement = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [menus, setMenus] = useState([]);
  const [menuData, setMenuData] = useState({});

  // ✅ Fetch Plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await getPlans();
        const plansData = res.data.plans || res.data;
        setPlans(plansData);

        if (plansData.length > 0) {
          setSelectedPlanId(plansData[0]._id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlans();
  }, []);

  // ✅ Fetch Menus
  useEffect(() => {
    if (!selectedPlanId) return;

    const fetchMenus = async () => {
      try {
        const res = await getMenus();
        const allMenus = res.menus || res.data?.menus || [];

        const filtered = allMenus.filter(
          (m) =>
            (m.planId?._id || m.planId)?.toString() === selectedPlanId
        );

        setMenus(filtered);

        // 🔥 Convert API data → UI structure
        const structured = {};

        days.forEach((day) => {
          structured[day] = {
            lunch: "",
            dinner: ""
          };
        });

        filtered.forEach((menu) => {
          const items = menu.items.map((i) => i.name).join(", ");

          structured[menu.day] = {
            ...structured[menu.day],
            [menu.mealType]: items
          };
        });

        setMenuData(structured);

      } catch (err) {
        console.error(err);
      }
    };

    fetchMenus();
  }, [selectedPlanId]);

  // ✅ Handle input change
  const handleChange = (day, type, value) => {
    setMenuData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }));
  };

  // ✅ Save Menu
  const handleSave = async () => {
    try {
      for (const day of days) {
        for (const type of ["lunch", "dinner"]) {
          const value = menuData[day]?.[type];

          if (!value) continue;

          const items = value.split(",").map((item) => ({
            name: item.trim(),
            type: "other"
          }));

          const existing = menus.find(
            (m) => m.day === day && m.mealType === type
          );

          if (existing) {
            await updateMenu(existing._id, {
              day,
              mealType: type,
              items
            });
          } else {
            await addMenu({
              planId: selectedPlanId,
              day,
              mealType: type,
              items
            });
          }
        }
      }

      toast.success("Menu saved successfully");

    } catch (err) {
      console.error(err);
      toast.error("Failed to save menu");
    }
  };

  return (
    <div className="p-6">

      {/* 🔥 Top Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">

        <div>
          <label className="mr-2 font-medium">Plan:</label>
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            className="p-2 border rounded"
          >
            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.planName}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
        >
          Save Menu
        </button>
      </div>

      {/* 🔥 Weekly UI */}
      <div className="space-y-5">
        {days.map((day) => (
          <div key={day} className="bg-white p-5 rounded-xl shadow">

            <h3 className="font-semibold mb-3">{day}</h3>

            <div className="grid md:grid-cols-2 gap-4">

              {/* Lunch */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Lunch</p>
                <input
                  type="text"
                  placeholder="Dal, Roti, Sabzi..."
                  value={menuData[day]?.lunch || ""}
                  onChange={(e) =>
                    handleChange(day, "lunch", e.target.value)
                  }
                  className="w-full p-3 border rounded"
                />
              </div>

              {/* Dinner */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Dinner</p>
                <input
                  type="text"
                  placeholder="Paneer, Roti..."
                  value={menuData[day]?.dinner || ""}
                  onChange={(e) =>
                    handleChange(day, "dinner", e.target.value)
                  }
                  className="w-full p-3 border rounded"
                />
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MenuManagement;