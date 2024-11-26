import express from 'express';
import vexor from 'vexor';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const { Vexor } = vexor;

// Inicializar Vexor con las credenciales
const vexorInstance = new Vexor({
  projectId: '674479f65b15195b50cd5883',
  apiKey: 'vx_prod_sk_173234b219f195b09f675192d2c713c7_e5637301_5ba8_4bd0_8b45_0ee8b9392aef_eef089', // Usar la clave secreta desde el archivo .env
});

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint para crear el pago
app.post('/create_payment', async (req, res) => {
  const { product } = req.body;

  if (!product || !product.title || !product.unit_price || !product.quantity) {
    return res.status(400).json({ error: 'El producto debe tener título, precio y cantidad' });
  }

  // Crear el producto que quieres usar para el pago
  const productToBuy = {
    title: "Producto de prueba",
    unit_price: 100,  // El precio debe ser un número
    quantity: 1,
  };

  try {
    const paymentResponse = await vexorInstance.pay.mercadopago({
      items: [productToBuy], // Enviar el producto como un array
    });

    res.status(200).json({ payment_url: paymentResponse.payment_url });
  } catch (error) {
    console.error('Error al crear el pago:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
