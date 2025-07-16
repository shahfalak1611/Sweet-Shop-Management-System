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

  deleteSweet(id) {
    const index = this.sweets.findIndex(sweet => sweet.id === id);
    if (index === -1) {
      throw new Error('Sweet with this ID does not exist');
    }
    this.sweets.splice(index, 1);
  }

  search({ name, category, minPrice, maxPrice }) {
    return this.sweets.filter(sweet => {
      const matchName = name ? sweet.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchCategory = category ? sweet.category === category : true;
      const matchMinPrice = minPrice !== undefined ? sweet.price >= minPrice : true;
      const matchMaxPrice = maxPrice !== undefined ? sweet.price <= maxPrice : true;
      return matchName && matchCategory && matchMinPrice && matchMaxPrice;
    });
  }

  getAllSweets() {
    return this.sweets;
  }
}

module.exports = { SweetShop };