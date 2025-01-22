import "./button.css";

export function Button({
  label = "",
  type = "button",
  isLoading = false,
  onClick,
  className = "",
}) {
  const stylesButton = ["button", className].join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={
        isLoading ? stylesButton.concat(" buttonDisabled") : stylesButton
      }
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
}
