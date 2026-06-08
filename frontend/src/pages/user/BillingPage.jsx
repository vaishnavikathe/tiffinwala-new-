import { useEffect, useState } from "react";
import { getUserSubscriptions } from "../../services/userApi";

const BillingPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getUserSubscriptions();
        setSubscriptions(res.data.subscriptions || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Billing calculation function
  const calculateBilling = (sub) => {
    if (sub.billingType === "postpaid") {
      const base = (sub.tiffinsConsumed || 0) * (sub.pricePerTiffin || 0);
      const extras = (sub.extraTiffins || 0) * (sub.pricePerTiffin || 0);
      return { base, extras, total: base + extras };
    } else {
      // Prepaid
      const base = sub.planDetails?.price || 0;
      const extraPrice = sub.planDetails?.price
        ? Math.round(sub.planDetails.price / (sub.planDetails.tiffinCount || 1))
        : 0;
      const extras = (sub.extraTiffins || 0) * extraPrice;
      return { base, extras, total: base + extras };
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (subscriptions.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No billing history yet!</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Billing</h1>

      <div className="space-y-4">
        {subscriptions.map((sub) => {
          const { base, extras, total } = calculateBilling(sub);
          return (
            <div key={sub._id} className="bg-white rounded-xl shadow p-5">

              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg">
                    {sub.planId?.planName || "Plan"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {sub.vendorId?.shopName || "Vendor"}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  {/* Billing Type Badge */}
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    sub.billingType === "postpaid"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-600"
                  }`}>
                    {sub.billingType || "prepaid"}
                  </span>
                  {/* Status Badge */}
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    sub.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}>
                    {sub.status}
                  </span>
                </div>
              </div>

              {/* Bill Details */}
              <div className="border-t pt-4 space-y-2">

                {sub.billingType === "postpaid" ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Price Per Tiffin</span>
                      <span>₹{sub.pricePerTiffin || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tiffins Consumed</span>
                      <span>{sub.tiffinsConsumed || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Base Amount</span>
                      <span>₹{base}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Plan Price</span>
                      <span>₹{base}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tiffin Count</span>
                      <span>{sub.planDetails?.tiffinCount || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration</span>
                      <span>{sub.planDetails?.duration || "—"}</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Extra Tiffins ({sub.extraTiffins || 0})
                  </span>
                  <span>₹{extras}</span>
                </div>

                <div className="flex justify-between font-bold text-base border-t pt-2">
                  <span>Total</span>
                  <span className="text-orange-600">₹{total}</span>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase">Start Date</p>
                  <p className="text-sm font-medium">
                    {new Date(sub.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase">End Date</p>
                  <p className="text-sm font-medium">
                    {new Date(sub.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BillingPage;