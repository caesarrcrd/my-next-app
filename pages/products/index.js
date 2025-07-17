// pages/products/index.js
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId !== null) {
      await fetch(`/api/products?id=${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: '', price: '' });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products?id=${id}`, {
      method: 'DELETE',
    });
    fetchProducts();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Daftar Produk</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
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
        <button type="submit">{editingId ? 'Update' : 'Tambah'}</button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - Rp{p.price}
            <button onClick={() => handleEdit(p)} style={{ marginLeft: 10 }}>
              Edit
            </button>
            <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 5 }}>
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
