const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, supplier: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, categoryId, supplierId } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, description, price, stock, categoryId, supplierId }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
