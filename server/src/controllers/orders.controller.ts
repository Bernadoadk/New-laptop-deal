import { Request, Response } from 'express';
import prisma from '../config/database';

export const getOrders = async (req: Request, res: Response) => {
  const { status, search } = req.query;

  try {
    const orders = await prisma.order.findMany({
      where: {
        status: status ? (status as string) : undefined,
        OR: search ? [
          { reference: { contains: search as string, mode: 'insensitive' } },
          { clientName: { contains: search as string, mode: 'insensitive' } },
        ] : undefined,
      },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { items: true },
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { clientName, clientPhone, zone, notes, totalAmount, type, items, setupConfig } = req.body;

  try {
    // Generate simple reference NLD-XXX
    const lastOrder = await prisma.order.findFirst({ orderBy: { id: 'desc' } });
    const nextId = lastOrder ? lastOrder.id + 1 : 1;
    const reference = `NLD-${nextId.toString().padStart(3, '0')}`;

    const order = await prisma.order.create({
      data: {
        reference,
        clientName,
        clientPhone,
        zone,
        notes,
        totalAmount,
        type,
        setupConfig,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId || null,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
          })),
        },
      },
      include: { items: true },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  try {
    const order = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: { status },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    // Items will be deleted automatically if cascade is set up in prisma or manually
    // In our schema they are not cascade, so delete them first
    await prisma.orderItem.deleteMany({ where: { orderId: parseInt(req.params.id) } });
    await prisma.order.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Order removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalOrders = await prisma.order.count();
    const pendingOrders = await prisma.order.count({ where: { status: 'pending' } });
    const deliveredOrders = await prisma.order.count({ where: { status: 'delivered' } });
    const productCount = await prisma.product.count({ where: { isActive: true } });

    const totalRevenue = await prisma.order.aggregate({
      where: { status: 'delivered' },
      _sum: { totalAmount: true },
    });

    res.json({
      totalOrders,
      pendingOrders,
      deliveredOrders,
      productCount,
      revenue: totalRevenue._sum.totalAmount || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
