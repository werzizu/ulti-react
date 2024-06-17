export default function Stats({ items }) {
  const count = items.length;
  if (!count) {
    return (
      <footer className="stats">Please start add anything to the list</footer>
    );
  }
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / count) * 100);
  return (
    <footer className="stats">
      <em>
        You have {count} items on your list and you already packed {numPacked} (
        {percentage}%)
      </em>
    </footer>
  );
}
