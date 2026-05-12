import BackButton from "../../components/layout/BackButton";

const MenuView = ({ menus }) => {
  return (
    <div className="space-y-4">
      {menus.map(menu => (
        <div key={menu._id} className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">
            {menu.day} - {menu.mealType}
          </h2>

          <ul className="mt-2">
            {menu.items.map((item, i) => (
              <li key={i} className="text-gray-600">
                • {item.name} ({item.type})
              </li>
            ))}
          </ul>
        </div>
      ))}
      <BackButton />
    </div>
    
  );
};

export default MenuView;