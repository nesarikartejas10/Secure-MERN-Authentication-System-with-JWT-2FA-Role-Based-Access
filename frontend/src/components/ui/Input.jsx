import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({
  type = "text",
  placeholder,
  id,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          id={id}
          className={className}
          {...props}
        />
        {showPassword ? (
          <FaRegEyeSlash
            className="absolute top-3 right-2.5 text-md cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <FaRegEye
            className="absolute top-3 right-2.5 text-md cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      className={className}
      {...props}
    />
  );
};

export default Input;
