import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  initialItems,
  setInitialItems,
  onDeleteItem,
}) {
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
