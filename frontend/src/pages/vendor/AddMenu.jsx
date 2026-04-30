import { useState, useEffect } from "react";
import { addMenu, updateMenu } from "../../services/vendorApi";
import toast from "react-hot-toast";

const AddMenu = ({ selectedPlan, editMenu, fetchMenus }) => {
  const [menu, setMenu] = useState({
    day: "",
    mealType: "lunch",
    items: [{ name: "", type: "sabzi" }]
  });

  const [loading, setLoading] = useState(false);

  // ✅ PREFILL (EDIT MODE)
  useEffect(() => {
    if (editMenu) {
      setMenu({
        day: editMenu.day || "",
        mealType: editMenu.mealType || "lunch",
        items:
          editMenu.items?.length > 0
            ? editMenu.items.map(item => ({ ...item })) // avoid mutation
            : [{ name: "", type: "sabzi" }]
      });
    } else {
      // ✅ RESET when switching back to ADD mode
      setMenu({
        day: "",
        mealType: "lunch",
        items: [{ name: "", type: "sabzi" }]
      });
    }
  }, [editMenu]);

  // 🔧 Handle item change
  const handleItemChange = (index, field, value) => {
    const updated = [...menu.items];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setMenu({ ...menu, items: updated });
  };

  const addItem = () => {
    setMenu(prev => ({
      ...prev,
      items: [...prev.items, { name: "", type: "sabzi" }]
    }));
  };

  const removeItem = (index) => {
    setMenu(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  // 🚀 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!menu.day) {
      return toast.error("Please select a day");
    }

    if (!menu.items.length || menu.items.some(i => !i.name)) {
      return toast.error("Please fill all item names");
    }

    try {
      setLoading(true);

      const payload = {
        day: menu.day,
        mealType: menu.mealType,
        items: menu.items
      };

      console.log("MENU DATA:", payload);

      if (editMenu) {
        // ✏️ UPDATE (NO planId needed)
        await updateMenu(editMenu._id, payload);
        toast.success("Menu updated successfully!");
      } else {
        // ➕ CREATE
        await addMenu({
          ...payload,
          planId: selectedPlan?._id
        });
        toast.success("Menu added successfully!");
      }

      if (fetchMenus) {
        await fetchMenus();
      }

    } catch (err) {
      console.error("FULL ERROR:", err?.response?.data);

      toast.error(
        err?.response?.data?.message || "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">

        {/* Day + Meal */}
        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="p-3 border rounded focus:ring-2 focus:ring-orange-400"
            value={menu.day}
            onChange={(e) =>
              setMenu({ ...menu, day: e.target.value })
            }
          >
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>

          <select
            className="p-3 border rounded focus:ring-2 focus:ring-orange-400"
            value={menu.mealType}
            onChange={(e) =>
              setMenu({ ...menu, mealType: e.target.value })
            }
          >
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        {/* Items */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">
            Menu Items
          </h3>

          {menu.items.map((item, i) => (
            <div key={i} className="grid md:grid-cols-3 gap-3">

              <input
                placeholder="Item Name"
                className="p-3 border rounded focus:ring-2 focus:ring-orange-400"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(i, "name", e.target.value)
                }
              />

              <select
                className="p-3 border rounded focus:ring-2 focus:ring-orange-400"
                value={item.type}
                onChange={(e) =>
                  handleItemChange(i, "type", e.target.value)
                }
              >
                <option value="sabzi">Sabzi</option>
                <option value="dal">Dal</option>
                <option value="rice">Rice</option>
                <option value="roti">Roti</option>
                <option value="other">Other</option>
              </select>

              <button
                type="button"
                onClick={() => removeItem(i)}
                className="bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="border border-orange-500 text-orange-600 px-4 py-2 rounded hover:bg-orange-50 transition"
          >
            + Add Item
          </button>
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className={`w-full py-3 rounded text-white font-medium flex items-center justify-center gap-2 transition
            ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
        >
          {loading ? (
            "Saving..."
          ) : editMenu ? (
            "✔ Update Menu"
          ) : (
            "✔ Add Menu"
          )}
        </button>

      </form>
    </div>
  );
};

export default AddMenu;