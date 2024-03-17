export default async function handler(req, res) {
    if (req.method === 'POST') {
        const paymentData = req.body;
        // Обработка данных об успешном платеже
        // Например, очистка корзины пользователя
        // clearUserCart(paymentData.user_id);

        res.status(200).json({message: 'Payment success received'});
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }
}


