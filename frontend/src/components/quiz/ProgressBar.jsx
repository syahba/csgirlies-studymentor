function ProgressBar() {
  return (
    <div>
      <div className="bg-[var(--lighter-accent-2)] h-2 w-[48rem] rounded overflow-hidden">
        <div className="bg-[var(--darker-accent-2)] h-full rounded w-[20%]"></div>
      </div>
    </div>
  );
}

export default ProgressBar;