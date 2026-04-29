import PlanCard from "./PlanCard";

const PlanList = ({ plans, onSubscribe, onViewMenu }) => {
  if (!plans.length) {
    return <p>No plans available</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
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