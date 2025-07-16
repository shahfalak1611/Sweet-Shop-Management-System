const { SweetShop } = require('../src/sweetShop');

describe('SweetShop - Add Sweet Feature', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

  test('should add a new sweet successfully', () => {
    shop.addSweet({
      id: 1,
      name: 'Milk Chocolate',
      category: 'chocolate',
      price: 50,
      quantity: 20,
    });

    expect(shop.getAllSweets().length).toBe(1);
  });

  test('should not allow adding a sweet with duplicate ID', () => {
    shop.addSweet({ id: 1, name: 'Barfi', category: 'pastry', price: 25, quantity: 10 });
    
    expect(() =>
      shop.addSweet({ id: 1, name: 'Jalebi', category: 'candy', price: 30, quantity: 5 })
    ).toThrow('Sweet with this ID already exists');
  });

  test('should throw error for missing required fields', () => {
    expect(() =>
      shop.addSweet({ id: 2, name: 'Ladoo', price: 20, quantity: 5 })
    ).toThrow('Invalid sweet data');
  });
});