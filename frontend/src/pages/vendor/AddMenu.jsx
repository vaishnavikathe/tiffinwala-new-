import { useState } from "react";
import { addMenu } from "../../services/vendorApi";
import toast from "react-hot-toast";

const AddMenu = ({ selectedPlan }) => {
  const [menu, setMenu] = useState({
    day: "",
    mealType: "lunch",
    items: [{ name: "", type: "sabzi" }]
  });

  const [loading, setLoading] = useState(false);

  

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

  const handleSubmit = async (e) => {
    e.preventDefault();

            try {
          setLoading(true);

          await addMenu({
            ...menu,
            planId: selectedPlan._id
          });

          toast.success("Menu added successfully!", {
            position: "top-right",
          });

          setMenu({
            day: "",
            mealType: "lunch",
            items: [{ name: "", type: "sabzi" }]
          });

        } catch (err) {
          console.error(err);

          // 🔥 ERROR TOAST
          toast.error(
            err?.response?.data?.message || "Failed to add menu",
            {
              position: "top-right",
            }
          );

        } finally {
          setLoading(false);
}
  };
  return (
    <div>

      {/* <h2 className="text-2xl font-semibold mb-4">
        Add Menu for: {selectedPlan?.planType|| selectedPlan?.name}
      </h2> */}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Day (Monday)"
            className="p-3 border rounded"
            value={menu.day}
            onChange={(e) =>
              setMenu({ ...menu, day: e.target.value })
            }
          />

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

        <button className="bg-orange-600 text-white w-full py-3 rounded">
          {loading ? "Adding..." : "Add Menu"}
        </button>

      </form>
    </div>
  );
};

export default AddMenu;