import { useState, useEffect } from "react";

const PlanModal = ({ onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    prepaid: true,
    postpaid: false,
    prepaidPlans: [
      { name: "", tiffinCount: "", price: "" }
    ],
    postpaidPlan: {
      deposit: "",
      pricePerTiffin: ""
    }
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  // 🔹 Handle prepaid changes
  const handlePrepaidChange = (index, field, value) => {
    const updated = [...form.prepaidPlans];
    updated[index][field] = value;
    setForm({ ...form, prepaidPlans: updated });
  };

  // 🔹 Add prepaid
  const addPrepaid = () => {
    setForm({
      ...form,
      prepaidPlans: [
        ...form.prepaidPlans,
        { name: "", tiffinCount: "", price: "" }
      ]
    });
  };

  // 🔹 Remove prepaid
  const removePrepaid = (index) => {
    const updated = form.prepaidPlans.filter((_, i) => i !== index);
    setForm({ ...form, prepaidPlans: updated });
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      planTypes: {
        prepaid: form.prepaid,
        postpaid: form.postpaid
      },
      prepaidPlans: form.prepaid
        ? form.prepaidPlans.map(p => ({
            name: p.name,
            tiffinCount: Number(p.tiffinCount),
            price: Number(p.price)
          }))
        : [],
      postpaidPlan: form.postpaid
        ? {
            deposit: Number(form.postpaidPlan.deposit),
            pricePerTiffin: Number(form.postpaidPlan.pricePerTiffin)
          }
        : {}
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
        
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Plan" : "Create Plan"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PLAN TYPE */}
          <div className="flex gap-6">
            <label>
              <input
                type="checkbox"
                checked={form.prepaid}
                onChange={() =>
                  setForm({ ...form, prepaid: !form.prepaid })
                }
              /> Prepaid
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.postpaid}
                onChange={() =>
                  setForm({ ...form, postpaid: !form.postpaid })
                }
              /> Postpaid
            </label>
          </div>

          {/* PREPAID */}
          {form.prepaid && (
            <div className="space-y-4">
              <h3 className="font-semibold">Prepaid Plans</h3>

              {form.prepaidPlans.map((plan, i) => (
                <div key={i} className="grid md:grid-cols-4 gap-3">

                  <input
                    placeholder="Plan Name"
                    className="p-3 border rounded"
                    value={plan.name}
                    onChange={(e) =>
                      handlePrepaidChange(i, "name", e.target.value)
                    }
                  />

                  <input
                    placeholder="Tiffin Count"
                    className="p-3 border rounded"
                    value={plan.tiffinCount}
                    onChange={(e) =>
                      handlePrepaidChange(i, "tiffinCount", e.target.value)
                    }
                  />

                  <input
                    placeholder="Price"
                    className="p-3 border rounded"
                    value={plan.price}
                    onChange={(e) =>
                      handlePrepaidChange(i, "price", e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => removePrepaid(i)}
                    className="text-red-500"
                  >
                    ❌
                  </button>

                </div>
              ))}

              <button
                type="button"
                onClick={addPrepaid}
                className="btn-outline"
              >
                + Add Plan
              </button>
            </div>
          )}

          {/* POSTPAID */}
          {form.postpaid && (
            <div className="space-y-4">
              <h3 className="font-semibold">Postpaid Plan</h3>

              <input
                placeholder="Deposit"
                className="w-full p-3 border rounded"
                value={form.postpaidPlan.deposit}
                onChange={(e) =>
                  setForm({
                    ...form,
                    postpaidPlan: {
                      ...form.postpaidPlan,
                      deposit: e.target.value
                    }
                  })
                }
              />

              <input
                placeholder="Price per Tiffin"
                className="w-full p-3 border rounded"
                value={form.postpaidPlan.pricePerTiffin}
                onChange={(e) =>
                  setForm({
                    ...form,
                    postpaidPlan: {
                      ...form.postpaidPlan,
                      pricePerTiffin: e.target.value
                    }
                  })
                }
              />
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button className="btn-primary">
              {initialData ? "Update" : "Create"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PlanModal;