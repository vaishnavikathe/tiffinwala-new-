const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  textarea = false,   // 👈 NEW PROP
  rows = 3,           // 👈 optional control
}) => {
  return (
    <div>
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="w-full mt-1 px-3 py-2 border rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 
                     resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full mt-1 px-3 py-2 border rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      )}
    </div>
  );
};

export default Input;