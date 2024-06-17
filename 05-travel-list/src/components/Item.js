export default function Item({ item, setInitialItems, onDeleteItem }) {
  function markDoneInitialItem() {
    setInitialItems((items) => [
      ...items.map((_item) =>
        _item.id === item.id ? { ...item, packed: !item.packed } : _item
      ),
    ]);
  }
  return (
    <li>
      <input
        type="checkbox"
        onClick={markDoneInitialItem}
        checked={item.packed}
        onChange={() => {}}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {"" + item.packed} {item.quantity} {item.description}{" "}
      </span>
      <button onClick={() => onDeleteItem(item.id)} style={{ color: "red" }}>
        &times;
      </button>
    </li>
  );
}
