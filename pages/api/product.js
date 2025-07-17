// pages/api/products.js

let products = [
  { id: 1, name: 'Laptop', price: 15000000 },
  { id: 2, name: 'Mouse', price: 250000 },
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(products);
      break;

    case 'POST':
      const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price,
      };
      products.push(newProduct);
      res.status(201).json(newProduct);
      break;

    case 'PUT':
      const { id, name, price } = req.body;
      products = products.map((p) =>
        p.id === id ? { ...p, name, price } : p
      );
      res.status(200).json({ id, name, price });
      break;

    case 'DELETE':
      const deleteId = parseInt(req.query.id);
      products = products.filter((p) => p.id !== deleteId);
      res.status(200).json({ id: deleteId });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
