// app/api/products/route.js

let products = [
  { id: 1, name: 'Produk A', price: 10000 },
  { id: 2, name: 'Produk B', price: 15000 },
];

export async function GET() {
  return Response.json(products);
}

export async function POST(req) {
  const body = await req.json();
  const newProduct = {
    id: Date.now(),
    name: body.name,
    price: body.price,
  };
  products.push(newProduct);
  return Response.json(newProduct);
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get('id'));
  const body = await req.json();
  products = products.map((p) =>
    p.id === id ? { ...p, name: body.name, price: body.price } : p
  );
  return Response.json({ message: 'Updated' });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get('id'));
  products = products.filter((p) => p.id !== id);
  return Response.json({ message: 'Deleted' });
}
    