import React from "react";
import { useState } from "react";
import "./Input.css";

const Input = () => {
  const [newItem, setNewItem] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  function addItem() {
    if (!newItem) {
      alert("This field is empty");
      return;
    }

    const item = {
      id: counter + 1,
      title: newItem,
      description: newItemDesc,
      status: false,
    };

    setCounter(counter + 1);
    setItems((oldList) => [...oldList, item]);

    setNewItem("");
    setNewItemDesc("");
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    const newItems = newArray.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setItems(newItems);

    if (newItems.length === 0) {
      setCounter(0);
    }
  }

  function toggleStatus(id) {
    setItems((oldList) =>
      oldList.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  }

  function openModal(id) {
    const item = items.find((item) => item.id === id);
    setSelectedItem(item);
  }

  function closeModal() {
    setSelectedItem(null);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Add an title of Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add an item description"
        value={newItemDesc}
        onChange={(e) => setNewItemDesc(e.target.value)}
      />
      <button onClick={() => addItem()}>Add</button>
      <ul style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item) => {
          return (
            <li
              key={item.id}
              style={{
                display: "flex",
                width: "35%",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: "10px",
                backgroundColor: "#f2f2f2",
              }}
            >
              <div>ID: {item.id}</div>
              <div>Title: {item.title}</div>
              <div>Description: {item.description}</div>
              <div>Status: {item.status ? "Complete" : "Uncomplete"}</div>
              <button onClick={() => toggleStatus(item.id)}>
                Toggle Status
              </button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
              <button onClick={() => openModal(item.id)}>Modal Winsow</button>
            </li>
          );
        })}
      </ul>
      {selectedItem && (
        <div className="modal">
          <div>Title: {selectedItem.title}</div>
          <div>Description: {selectedItem.description}</div>
          <div>Status: {selectedItem.status ? "Done" : "In Process"}</div>
          <button onClick={() => closeModal()}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Input;
