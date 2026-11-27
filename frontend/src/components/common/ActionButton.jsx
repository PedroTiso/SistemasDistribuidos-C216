function ActionButton({ children, onClick, variant = "primary", type = "button" }) {
  const styles = {
    primary: "bg-amber-300 text-[#17211b] hover:bg-amber-200",
    dark: "bg-[#17211b] text-amber-300 hover:bg-[#223128]",
    outline: "border border-stone-400 text-stone-700 hover:border-teal-700 hover:text-teal-700",
  };

  return (
    <button
      className={`rounded-full px-6 py-3 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-teal-200 ${styles[variant]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default ActionButton;
