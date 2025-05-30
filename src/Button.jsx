
export default function Button({text ="", onClick }) {
    const textColor = text === "X" ? "text-red-600" : text === "O" ? "text-green-600" : "";

  return (
    <button
      onClick={onClick}
      className={`w-32 h-32 md:w-48 md:h-48 bg-gray-600 hover:bg-gray-500 border-4 border-black font-bold text-6xl md:text-7xl flex items-center justify-center transition-colors ${textColor}`}
    >
        {text}
    </button>
  );
}
