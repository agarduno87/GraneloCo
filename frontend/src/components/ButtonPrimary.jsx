export default function ButtonPrimary({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-blue-600 hover:bg-blue-700
        text-white font-semibold
        px-6 py-3 rounded-xl
        shadow-lg transition
        flex items-center justify-center
      "
    >
      {text}
    </button>
  );
}
