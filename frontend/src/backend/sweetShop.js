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

  purchaseSweet(id, quantity) {
    if (quantity <= 0) {
      throw new Error('Invalid purchase quantity');
    }

    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (sweet.quantity < quantity) {
      throw new Error('Insufficient stock');
    }

    sweet.quantity -= quantity;
  }

  restockSweet(id, quantity) {
    if (quantity <= 0) {
      throw new Error('Invalid restock quantity');
    }

    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    sweet.quantity += quantity;
  }

  updateSweet(id, updates) {
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (!updates || Object.keys(updates).length === 0) {
      throw new Error('No update fields provided');
    }

    const allowedFields = ['name', 'category', 'price', 'quantity'];
    for (let key of Object.keys(updates)) {
      if (allowedFields.includes(key) && updates[key] !== undefined) {
        sweet[key] = updates[key];
      }
    }
  }

  sortSweets(field, order = 'asc') {
    const validFields = ['id','name', 'category', 'price', 'quantity'];
    if (!validFields.includes(field)) {
      throw new Error('Invalid sort field');
    }

    const sorted = [...this.sweets].sort((a, b) => {
      if (typeof a[field] === 'string') {
        return a[field].localeCompare(b[field]);
      }
      return a[field] - b[field];
    });

    return order === 'desc' ? sorted.reverse() : sorted;
  }
  
setSweets(sweetsArray) {
  if (Array.isArray(sweetsArray)) {
    this.sweets = sweetsArray;
  }
}
  getAllSweets() {
    return this.sweets;
  }
}

export default  SweetShop ;