import { useState } from "react";
import "./index.css";
let _initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 3, packed: true },
];
function App() {
  const [initialItems, setInitialItems] = useState(_initialItems);

  function handleAddItems(newItem) {
    setInitialItems([...initialItems, newItem]);
  }

  function handleDeleteItem(itemId) {
    setInitialItems((items) => items.filter((_item) => _item.id !== itemId));
  }

  return (
    <div className="app">
      <DateSelect />
      <Logo />
      <Form initialItems={initialItems} onAddItems={handleAddItems} />
      <PackingList
        initialItems={initialItems}
        setInitialItems={setInitialItems}
        onDeleteItem={handleDeleteItem}
      />
      <Stats items={initialItems} />
    </div>
  );
}

function DateSelect() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <div>
      <input
        type="range"
        min="0"
        max="10"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <span>step: {step}</span>

      <button onClick={() => setCount((v) => v - step)}>-</button>
      <input
        type="text"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={() => setCount((v) => v + step)}>+</button>
    </div>
  );
}

function Logo() {
  return <h1>FAR AWAY </h1>;
}

function Form({ initialItems, onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(2);
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    console.log(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          console.log(e.target.value);
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          return (
            <option key={num} value={num}>
              {num}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          console.log(e.target);
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ initialItems, setInitialItems, onDeleteItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = initialItems;
  if (sortBy === "desctiption")
    sortedItems = initialItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = initialItems
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  function onClearAllItems() {
    const confirm = window.confirm("Are you really want to clear all items?");
    if (confirm) {
      setInitialItems([]);
    }
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            setInitialItems={setInitialItems}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input Order </option>
          <option value="desctiption">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={onClearAllItems}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, setInitialItems, onDeleteItem }) {
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

function Stats({ items }) {
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

export default App;
