const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { product: true }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTransaction = async (req, res) => {
  const { productId, quantity, customerName, customerEmail } = req.body;
  
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) } 
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const totalPrice = product.price * quantity;

    const transaction = await prisma.transaction.create({
      data: { 
        productId: parseInt(productId),
        quantity: parseInt(quantity),
        totalPrice,
        customerName,
        customerEmail,
        status: "pending"
      }
    });

    await prisma.product.update({
      where: { id: parseInt(productId) },
      data: { stock: product.stock - quantity }
    });

    res.status(201).json(transaction);

  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ 
      error: 'Failed to create transaction',
      details: error.message 
    });
  }
};

