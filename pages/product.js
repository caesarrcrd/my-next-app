// pages/products.js

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, ...form }),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setForm({ name: "", price: "" });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price });
    setEditId(product.id);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Daftar Produk</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Nama Produk"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Harga"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Tambah"}</button>
      </form>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - Rp{p.price}
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
