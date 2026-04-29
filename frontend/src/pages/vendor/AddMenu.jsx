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

  // ✅ PREFILL FORM WHEN EDITING
  useEffect(() => {
    if (editMenu) {
      setMenu({
        day: editMenu.day || "",
        mealType: editMenu.mealType || "lunch",
        items:
          editMenu.items?.length > 0
            ? editMenu.items
            : [{ name: "", type: "sabzi" }]
      });
    }
  }, [editMenu]);

  // 🔧 Handle item change
  const handleItemChange = (index, field, value) => {
    const updated = [...menu.items];
    updated[index][field] = value;
    setMenu({ ...menu, items: updated });
  };

  const addItem = () => {
    setMenu({
      ...menu,
      items: [...menu.items, { name: "", type: "sabzi" }]
    });
  };

  const removeItem = (index) => {
    const updated = menu.items.filter((_, i) => i !== index);
    setMenu({ ...menu, items: updated });
  };

  // 🚀 SUBMIT (ADD + EDIT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        day: menu.day,
        mealType: menu.mealType,
        items: menu.items,
        planId: selectedPlan?._id
      };

      console.log("MENU DATA:", payload);

      if (editMenu) {
        // ✏️ UPDATE
        await updateMenu(editMenu._id, payload);
        toast.success("Menu updated successfully!");
      } else {
        // ➕ ADD
        await addMenu(payload);
        toast.success("Menu added successfully!");
      }

      if (fetchMenus) {
        await fetchMenus();
      }

      // 🔄 RESET FORM
      setMenu({
        day: "",
        mealType: "lunch",
        items: [{ name: "", type: "sabzi" }]
      });

    } catch (err) {
      console.error("FULL ERROR:", err.response?.data);

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
            className="p-3 border rounded"
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
            className="p-3 border rounded"
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
          <h3 className="font-semibold">Menu Items</h3>

          {menu.items.map((item, i) => (
            <div key={i} className="grid md:grid-cols-3 gap-3">
              
              <input
                placeholder="Item Name"
                className="p-3 border rounded"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(i, "name", e.target.value)
                }
              />

              <select
                className="p-3 border rounded"
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
                className="bg-red-100 text-red-600 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="border border-orange-500 px-4 py-2 rounded"
          >
            + Add Item
          </button>
        </div>

        {/* Submit */}
        <button className="bg-orange-600 text-white w-full py-3 rounded">
          {loading
            ? editMenu
              ? "Updating..."
              : "Adding..."
            : editMenu
            ? "Update Menu"
            : "Add Menu"}
        </button>

      </form>
    </div>
  );
};

export default AddMenu;