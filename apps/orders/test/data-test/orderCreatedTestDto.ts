import { OrderDto } from '../../../../dto/order.dto';

export const orderCreatedTestDto: OrderDto = {
  id: 'commande 3',
  email: 'test1@gmail.com',
  status: 'created',
  items: [
    {
      productId: 'produit1',
      quantity: 2,
      price: 15.99,
    },
    {
      productId: 'produit2',
      quantity: 1,
      price: 5.69,
    },
  ],
  adresse: '5 rue de la victoire 59000 Lille',
};
