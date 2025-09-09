// pages/customers.js
import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  // Fetch customers
  const fetchCustomers = async () => {
    const res = await fetch("/api/customers");
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Add customer
  const addCustomer = async () => {
    if (!form.name || !form.email) return alert("Fill all fields");

    await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "" });
    fetchCustomers();
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    await fetch(`/api/customers?id=${id}`, { method: "DELETE" });
    fetchCustomers();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

      {/* Add Customer Form */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          className="border px-2 py-1 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border px-2 py-1 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={addCustomer}
        >
          Add
        </button>
      </div>

      {/* Customer List */}
      <ul className="space-y-2">
        {customers.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
          >
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-600">{c.email}</p>
            </div>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => deleteCustomer(c.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
