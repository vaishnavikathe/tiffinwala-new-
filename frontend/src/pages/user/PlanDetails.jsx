import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlanByMenu } from "../../services/userApi";
import MenuView from "../../components/user/MenuView";

const PlanDetails = () => {
  const { planId } = useParams();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, [planId]);

  const fetchMenu = async () => {
    const res = await getPlanByMenu(planId);
    setMenus(res.data.menus || []);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Menu</h1>

      {menus.length === 0 ? (
        <p>No Menu Available</p>
      ) : (
        <MenuView menus={menus} />
      )}
    </div>
  );
};

export default PlanDetails;