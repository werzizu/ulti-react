import { useState } from "react";
import "./index.css";
let initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 3, packed: true },
];
function App() {
  return (
    <div className="app">
      <DateSelect />
      <Logo />
      <Form />
      <PackingList />
      <Stats />
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

function Form() {
  const [description, setDesctiption] = useState("");
  const [quantity, setQuantity] = useState(2);
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    initialItems.push(newItem);
    console.log(newItem);
    setDesctiption("");
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
          setDesctiption(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
      </span>
      <button style={{ color: "red" }}>&times;</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you already packed x (X%)</em>
    </footer>
  );
}

export default App;
