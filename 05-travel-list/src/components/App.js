import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import DataSelect from "./DataSelect";
import Stats from "./Stats";

import "../index.css";
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
      <DataSelect />
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

export default App;
