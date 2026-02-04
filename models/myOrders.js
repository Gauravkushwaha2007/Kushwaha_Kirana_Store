
const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/databaseUtil');

module.exports = class Cart {

  static async addToCart(productId) {
    const db = getDb();

    const existing = await db.collection('Cart')
      .findOne({ productId: new ObjectId(productId) });

    if (existing) {
      // qty +1
      return db.collection('Cart').updateOne(
        { productId: new ObjectId(productId) },
        { $inc: { quantity: 1 } }
      );
    } else {
      // new
      return db.collection('Cart').insertOne({
        productId: new ObjectId(productId),
        quantity: 1
      });
    }
  }

  static increaseQty(productId) {
    const db = getDb();
    return db.collection('Cart').updateOne(
        { productId: new ObjectId(productId) },
        { $inc: { quantity: 1 } }
    );
}


  static getCartItems() {
    const db = getDb();
    return db.collection('Cart').find().toArray();
  }

  static removeFromCart(productId) {
    const db = getDb();
    return db.collection('Cart')
      .deleteOne({ productId: new ObjectId(productId) });
  }
};
