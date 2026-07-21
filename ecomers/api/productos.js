import db from '../db.json' assert { type: 'json' };

export default function handler(req, res) {

  const productos = db.productos;

  if (req.method === 'GET') {
    return res.status(200).json(productos);
  }

  res.status(405).json({ error: 'Método no permitido' });
}