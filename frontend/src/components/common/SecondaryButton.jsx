function SecondaryButton({ text, onClick, outlineColor }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`outline-2 ${outlineColor} py-2.5 px-8 rounded-3xl shadow-[4px_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer`}
    >
      <p className={`text-[var(--black)] font-bold text-lg`}>{text}</p>
    </button>
  );
}

export default SecondaryButton;