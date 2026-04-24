const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "px-5 py-2 rounded-md transition duration-200 font-medium";

  const variants = {
    primary: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90",
    outline: "border border-black text-black hover:bg-black hover:text-white",
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;