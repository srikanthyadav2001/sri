// src/components/ItemManager.js
import React, { useEffect, useState } from 'react';
import { getItems, createItem, getItemById, updateItem, deleteItem } from '../api';

const ItemManager = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', content: '' }); // Adjust based on your model
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await getItems();
        setItems(data);
    };

    const handleCreate = async () => {
        await createItem(newItem);
        setNewItem({ title: '', content: '' }); // Reset form
        fetchItems(); // Refresh the list
    };

    const handleEdit = async (id) => {
        const item = await getItemById(id);
        setEditItem(item);
    };

    const handleUpdate = async () => {
        await updateItem(editItem._id, editItem);
        setEditItem(null); // Reset edit state
        fetchItems(); // Refresh the list
    };

    const handleDelete = async (id) => {
        await deleteItem(id);
        fetchItems(); // Refresh the list
    };

    return (
        <div>
            <h1>Item Manager</h1>
            <h2>Create Item</h2>
            <input
                type="text"
                placeholder="Title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            />
            <textarea
                placeholder="Content"
                value={newItem.content}
                onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
            />
            <button onClick={handleCreate}>Create</button>

            <h2>Items List</h2>
            <ul>
                {items.map(item => (
                    <li key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        <button onClick={() => handleEdit(item._id)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editItem && (
                <div>
                    <h2>Edit Item</h2>
                    <input
                        type="text"
                        value={editItem.title}
                        onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                    />
                    <textarea
                        value={editItem.content}
                        onChange={(e) => setEditItem({ ...editItem, content: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
        </div>
    );
};

export default ItemManager;