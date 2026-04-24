const VendorCard = ({ vendor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
    >
      <h2 className="text-lg font-bold">{vendor.name}</h2>
      <p className="text-gray-500">{vendor.category || "Mess"}</p>
    </div>
  );
};

export default VendorCard;