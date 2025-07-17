// pages/products/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      const found = data.find((p) => p.id === parseInt(id));
      setProduct(found);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Memuat data produk...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Detail Produk</h1>
      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Nama:</strong> {product.name}</p>
      <p><strong>Harga:</strong> Rp{product.price}</p>

      <button onClick={() => router.push('/products')}>Kembali</button>
    </div>
  );
}
