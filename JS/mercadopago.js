document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch('http://localhost:3000/create_payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product: {
          id: '123',
          title: 'Producto ejemplo',
          description: 'Descripción del producto',
          quantity: 1,
          unit_price: 100,
        },
      }),
    });

    const data = await response.json();

    if (data.payment_url) {
      window.location.href = data.payment_url; // Redirigir a la URL de pago
    } else {
      throw new Error(data.error || 'No se recibió la URL de pago');
    }
  } catch (error) {
    console.error('Error al crear el pago:', error);
    alert('Hubo un error al procesar el pago: ' + error.message);
  }
});
