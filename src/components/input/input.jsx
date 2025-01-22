import "./input.css";

export function Input({
  type = "text",
  name = "",
  value,
  onChange,
  errors = false,
  helperText = "",
  placeholder = "",
}) {
  const classNameInputError = errors
    ? "inputHelperText".concat(" inputHelperTextError")
    : "inputHelperText";

  return (
    <div>
      <div className="formGroup">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={(event) => (event.target.readOnly = false)}
          placeholder={placeholder}
        />
      </div>

      {helperText && <span className={classNameInputError}>{helperText}</span>}
    </div>
  );
}
