export default function ButtonPrimary({ text, onClick }) {
  return (
    <button className="btn-primary" onClick={onClick}>
      {text}
    </button>
  );
}
