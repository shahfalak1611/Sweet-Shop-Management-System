class SweetShop {
  constructor() {
    this.sweets = [];
  }

  addSweet({ id, name, category, price, quantity }) {
    if (
      id === undefined || !name || !category ||
      price === undefined || quantity === undefined
    ) {
      throw new Error('Invalid sweet data');
    }

    if (this.sweets.some(sweet => sweet.id === id)) {
      throw new Error('Sweet with this ID already exists');
    }

    this.sweets.push({ id, name, category, price, quantity });
  }

  getAllSweets() {
    return this.sweets;
  }
}

module.exports = { SweetShop };