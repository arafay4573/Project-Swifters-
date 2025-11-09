const { Paddle, Environment } = require('@paddle/paddle-node-sdk');
const User = require('../models/User');

const paddle = new Paddle(process.env.PADDLE_API_KEY, {
  environment: Environment.sandbox,
});

// @desc    Create a Paddle checkout session
// @route   POST /api/paddle/create-checkout-session
// @access  Private
const createCheckoutSession = async (req, res) => {
  const { priceId } = req.body;
  const user = req.user;

  try {
    const transaction = await paddle.transactions.create({
      items: [{ priceId, quantity: 1 }],
      customer: {
        email: user.email,
      },
      customData: {
        userId: user.id,
      },
    });

    res.json({ checkoutUrl: transaction.checkout.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create Paddle checkout session' });
  }
};

// @desc    Handle Paddle webhook
// @route   POST /api/paddle/webhook
// @access  Public
const handleWebhook = async (req, res) => {
  const signature = req.headers['paddle-signature'];
  const rawRequestBody = req.body;
  const secretKey = process.env.PADDLE_WEBHOOK_SECRET;

  try {
    if (signature && rawRequestBody) {
      const eventData = paddle.webhooks.unmarshal(rawRequestBody, secretKey, signature);

      if (eventData.eventType === 'transaction.completed') {
        const userId = eventData.data.customData.userId;
        const user = await User.findById(userId);

        if (user) {
          user.subscriptionStatus = 'Premium';
          await user.save();
        }
      }
    }
    res.status(200).send('Webhook received');
  } catch (err) {
    console.error('Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = { createCheckoutSession, handleWebhook };
