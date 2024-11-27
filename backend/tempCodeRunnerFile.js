import express from 'express';
import cors from 'cors';
import vexor from 'vexor';
import dotenv from 'dotenv';

dotenv.config();
const { Vexor } = vexor;

const vexorInstance = new Vexor({
  publishableKey: 'vx_prod_pk_3987b515e08690b38a12e7b879067191_cfc3b47d_27ee_47a5_b853_45cafc87f92c_cb7343',
  projectId: '6745b874af5a476fef64f7b8',
  apiKey: 'vx_prod_sk_f35f62a439b8c86a489526275ac0f351_2421754c_3f8d_47ac_a9a8_50b76c91d86a_200aca',
});

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.post('/create_payment', async (req, res) => {
  const { product } = req.body;

  if (!product || !product.title || !product.unit_price || !product.quantity) {
    return res.status(400).json({ error: 'El producto debe tener título, precio y cantidad' });
  }

  try {
    const paymentResponse = await vexorInstance.pay.mercadopago({
      items: [
        {
          title: product.title,
          unit_price: product.unit_price,
          quantity: product.quantity,
        },
      ],
    });

    res.status(200).json({ payment_url: paymentResponse.payment_url });
  } catch (error) {
    console.error('Error al crear el pago:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
