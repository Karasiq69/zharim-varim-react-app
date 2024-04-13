import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const { orderId, paymentStatus } = req.body;

    if (paymentStatus === 'succeeded') {
      // Очистить корзину, используя контекст ShoppingCartContext
      // Здесь вам нужно получить доступ к контексту и вызвать функцию clearCart()
      // Например, вы можете использовать серверный рендеринг или отправить событие через веб-сокеты

      res.status(200).json({ message: 'Cart cleared successfully' });
    } else {
      res.status(400).json({ message: 'Invalid payment status' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}