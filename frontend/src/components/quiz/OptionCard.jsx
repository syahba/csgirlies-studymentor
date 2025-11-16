function OptionCard({ text }) {
  return (
    <div className="bg-[var(--neutral)] px-4 py-2 flex items-center justify-center gap-3 rounded-full">
      <div className="bg-[var(--lighter-accent-2)] h-4 w-4 rounded-full"></div>
      <p className="text-body text-[var(--black)] max-w-80">
        {text}
      </p>
    </div>
  );
}

export default OptionCard;
