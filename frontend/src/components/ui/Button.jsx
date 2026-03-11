const Button = ({ type = "button", className = "", title, ...props }) => {
  return (
    <button type={type} className={className} {...props}>
      {title}
    </button>
  );
};

export default Button;
