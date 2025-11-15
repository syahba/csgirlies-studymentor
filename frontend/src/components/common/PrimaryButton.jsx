function PrimaryButton({ bgColor, text, isBig}) {
  let padding;
  let textSize;
  let background;

  if (isBig) {
    padding = "py-2.5 px-8";
    textSize = "text-lg";
  } else {
    padding = "py-2 px-5";
  }

  if (bgColor === 'yellow') {
    background = 'var(--secondary)';
  } else if (bgColor === 'light-yellow') {
    background = 'var(--lighter-secondary)';
    textSize =+ ' text-[var(--black)]';
  } else if (bgColor === 'orange') {
    background = 'var(--primary)';
  } else if (bgColor === 'purple') {
    background = 'var(--accent-2)';
  } else if (bgColor === 'black') {
    background = 'var(--black)';
  }

  return (
    <button className={`bg-[${background}] ${padding} rounded-3xl shadow-[4px_4px_12px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-200 ease-in-out`}>
      <p className={`text-white font-bold ${textSize}`}>{text}</p>
    </button>
  );
}

export default PrimaryButton;