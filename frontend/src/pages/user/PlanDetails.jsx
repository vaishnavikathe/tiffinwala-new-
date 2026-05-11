import { useEffect, useState } from "react";

import {
  useParams,
  useSearchParams
} from "react-router-dom";

import { getPlanByMenu } from "../../services/userApi";

import BackButton from "../../components/layout/BackButton";

const PlanDetails = () => {

  const { planId } = useParams();

  const [searchParams] =
    useSearchParams();

  const type =
    searchParams.get("type");

  const [menus, setMenus] =
    useState([]);

  useEffect(() => {

    fetchMenu();

  }, [planId]);

  const fetchMenu = async () => {

    try {

      const res =
        await getPlanByMenu(planId);

      setMenus(res.data.menus || []);

    } catch (err) {

      console.error(err);

    }
  };

  return (

    <div className="p-6 grid lg:grid-cols-3 gap-6">

      {/* LEFT */}
      <div className="lg:col-span-2">

        {/* TOP CARD */}
        <div className="rounded-3xl overflow-hidden shadow-lg">

          <div className="bg-gradient-to-r from-green-800 to-yellow-700 text-white p-10">

            <span className="bg-white/20 px-4 py-1 rounded-full text-sm uppercase">
              {type}
            </span>

            <h1 className="text-5xl font-bold mt-6">
              Subscription Plan
            </h1>

            <p className="text-xl mt-2 opacity-90">
              Daily healthy meals
            </p>

            <div className="grid grid-cols-3 mt-10 gap-6">

              <div>
                <p className="opacity-70">
                  START
                </p>

                <h2 className="text-2xl font-bold">
                  2026-05-08
                </h2>
              </div>

              <div>
                <p className="opacity-70">
                  END
                </p>

                <h2 className="text-2xl font-bold">
                  2026-06-07
                </h2>
              </div>

              <div>
                <p className="opacity-70">
                  STATUS
                </p>

                <h2 className="text-2xl font-bold">
                  Active
                </h2>
              </div>

            </div>

          </div>

          {/* MENU */}
          <div className="bg-white p-8">

            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-2xl font-bold">
                  This week's menu
                </h2>

                <p className="text-gray-500">
                  Fresh meals daily
                </p>

              </div>

              <button className="border px-5 py-3 rounded-2xl hover:bg-gray-50">
                + Order extra tiffin
              </button>

            </div>

            {/* MENUS */}
            {menus.length === 0 ? (

              <p>No Menu Available</p>

            ) : (

              menus.map((menu) => (

                <div
                  key={menu._id}
                  className="grid grid-cols-4 border rounded-2xl p-5 mb-4"
                >

                  <h3 className="font-bold">
                    {menu.day}
                  </h3>

                  <p>
                    {menu.breakfast || "-"}
                  </p>

                  <p>
                    {menu.lunch || "-"}
                  </p>

                  <p>
                    {menu.dinner || "-"}
                  </p>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="space-y-6">

        {/* BILL */}
        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-3xl font-bold mb-8">
            Bill summary
          </h2>

          <div className="flex justify-between mb-4">

            <p>Plan price</p>

            <p className="font-semibold">
              ₹3200
            </p>

          </div>

          <div className="flex justify-between mb-6 text-gray-500">

            <p>Extra tiffins (0)</p>

            <p>₹0</p>

          </div>

          <hr />

          <div className="flex justify-between mt-6 text-3xl font-bold text-green-700">

            <p>Total</p>

            <p>₹3200</p>

          </div>

          <button className="mt-6 border border-orange-400 text-orange-500 px-4 py-2 rounded-full">
            Due at month-end
          </button>

        </div>

        {/* EXTRA */}
        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-4">
            Extra tiffins
          </h2>

          <p className="text-gray-500">
            No extras yet.
          </p>

        </div>

        {/* CANCEL */}
        <button className="w-full text-red-500 py-4 text-lg">

          ✕ Cancel subscription

        </button>

      </div>

      <BackButton />

    </div>
  );
};

export default PlanDetails;