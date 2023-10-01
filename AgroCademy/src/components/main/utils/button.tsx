const Button = ({ text, color, bg }: { text: string; color: string; bg: string }) => {
  return (
    <button className={`rounded shadow ${color} font-play text-sm font-semibold px-3 py-1.5 ${bg}`}>
      {text}
    </button>
  );
};

export default Button;
