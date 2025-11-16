import PropTypes from "prop-types";

function PrimaryButton({ bgColor, text, isBig, isSubmit = false, onClick }) {
  let padding;
  let textSize;
  let background;
  let textColor = "text-white";

  if (isBig) {
    padding = "py-2.5 px-8";
  } else {
    padding = "py-2 px-5";
    textSize = "text-sm";
  }

  if (bgColor === "yellow") {
    background = "bg-[var(--secondary)]";
  } else if (bgColor === "light-yellow") {
    background = "bg-[var(--darker-secondary)]";
    textColor = "text-[var(--black)]";
  } else if (bgColor === "orange") {
    background = "bg-[var(--primary)]";
  } else if (bgColor === "purple") {
    background = "bg-[var(--darker-accent-2)]";
  } else if (bgColor === "black") {
    background = "bg-[var(--black)]";
  }

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      className={`${background} ${padding} rounded-3xl shadow-[4px_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer`}
    >
      <p className={`${textColor} font-bold ${textSize}`}>{text}</p>
    </button>
  );
}

PrimaryButton.propTypes = {
  bgColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isBig: PropTypes.bool.isRequired,
  isSubmit: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default PrimaryButton;
