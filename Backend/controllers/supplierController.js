const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSupplier = async (req, res) => {
  const { name, address, phone, email } = req.body;
  try {
    const supplier = await prisma.supplier.create({
      data: { name, address, phone, email }
    });
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
