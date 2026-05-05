// src/components/user/PlanList.jsx

import PlanCard from "./PlanCard";

const PlanList = ({ plans, onSubscribe, onViewMenu }) => {
  if (!plans || plans.length === 0) {
    return (
      <p className="text-gray-500">
        No plans available
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <PlanCard
          key={plan._id}
          plan={plan}
          onSubscribe={onSubscribe}
          onViewMenu={onViewMenu}
        />
      ))}
    </div>
  );
};

export default PlanList;