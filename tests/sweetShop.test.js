const { SweetShop } = require('../src/sweetShop');

//tests for adding a sweet
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


//tests for deleting a sweet
describe('SweetShop - Delete Sweet Feature', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'pastry', price: 100, quantity: 10 });
    shop.addSweet({ id: 2, name: 'Gulab Jamun', category: 'candy', price: 60, quantity: 15 });
  });

  test('should delete a sweet by ID successfully', () => {
    shop.deleteSweet(1);
    const sweets = shop.getAllSweets();
    expect(sweets.length).toBe(1);
    expect(sweets[0].id).toBe(2);
  });

  test('should throw error if sweet ID does not exist', () => {
    expect(() => shop.deleteSweet(99)).toThrow('Sweet with this ID does not exist');
  });
});


//tests for viewing all sweets
describe('SweetShop - View Sweets Feature', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Rasgulla', category: 'candy', price: 40, quantity: 30 });
    shop.addSweet({ id: 2, name: 'Soan Papdi', category: 'pastry', price: 35, quantity: 50 });
  });

  test('should return all sweets currently in the shop', () => {
    const sweets = shop.getAllSweets();
    expect(sweets.length).toBe(2);
    expect(sweets).toEqual([
      { id: 1, name: 'Rasgulla', category: 'candy', price: 40, quantity: 30 },
      { id: 2, name: 'Soan Papdi', category: 'pastry', price: 35, quantity: 50 }
    ]);
  });

  test('should return an empty array if no sweets are available', () => {
    const emptyShop = new SweetShop();
    expect(emptyShop.getAllSweets()).toEqual([]);
  });
});


//tests for search & sort sweets
describe('SweetShop - Search Feature', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'pastry', price: 100, quantity: 10 });
    shop.addSweet({ id: 2, name: 'Ladoo', category: 'candy', price: 50, quantity: 20 });
    shop.addSweet({ id: 3, name: 'Milk Cake', category: 'pastry', price: 70, quantity: 15 });
  });

  test('should search sweets by name (case-insensitive)', () => {
    const result = shop.search({ name: 'kaju katli' });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Kaju Katli');
  });

  test('should search sweets by category', () => {
    const result = shop.search({ category: 'pastry' });
    expect(result.length).toBe(2);
  });

  test('should search sweets by price range', () => {
    const result = shop.search({ minPrice: 60, maxPrice: 100 });
    expect(result.length).toBe(2);
  });

  test('should return all sweets if no criteria provided', () => {
    const result = shop.search({});
    expect(result.length).toBe(3);
  });

  test('should return empty array if no matches found', () => {
    const result = shop.search({ name: 'Jalebi' });
    expect(result).toEqual([]);
  });
});