const Product = require("../models/product");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/shopping");

let products = [
  new Product({
    imagePath:
      "https://images.pexels.com/photos/57445/golden-pheasant-bird-exotic-wildlife-57445.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Golden Pheasant",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae dolorem ad voluptates aut sunt at totam molestiae tenetur. Eius ab repellat inventore doloribus illo doloremque iste explicabo aliquam voluptas quam.",
    price: 8,
  }),
  new Product({
    imagePath:
      "https://i.pinimg.com/originals/3b/9c/4e/3b9c4e786789d35bfc49b260df5483b9.jpg",
    title: "Love Birds",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores nam sapiente tempore suscipit? Tenetur beatae eum incidunt laboriosam tempore dolorum quo, nobis numquam temporibus illum. Ut distinctio inventore incidunt porro.",
    price: 16,
  }),
];
let done = 0;
for (let index = 0; index < products.length; index++) {
  products[index].save(function (error, result) {
    done++;
    if (done == products.length) {
      mongoose.disconnect();
    }
  });
}
