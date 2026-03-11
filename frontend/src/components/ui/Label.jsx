const Label = ({ htmlFor, className, value, ...props }) => {
  return (
    <label htmlFor={htmlFor} className={className} {...props}>
      {value}
    </label>
  );
};

export default Label;
