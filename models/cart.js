module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, price: 0, qty: 0 };
    }
    storedItem.qty++;
    storedItem.price = storedItem.qty * storedItem.item.price;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };
};
