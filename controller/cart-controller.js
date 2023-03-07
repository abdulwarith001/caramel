const { NodeDiskStorage } = require("node-disk-storage");
const nds = new NodeDiskStorage();
let arr = [];



const clearCartItems = async(req, res) => {
  const items = await nds.clear()
  // return items
  res.send(items)
}

const addToCart = async(req, res) => {
  let {id, name, quantity, price } = req.body;
 const cart = await nds.set(id, {name, id, quantity, price})

 return cart
};

const getCart = async (req, res) => {
  const get = await nds.keys()
  // const so = get.map(async(g) =>await nds.get(g))
  // const data = await nds.get(get)

   res.send(get)
};

const getCartValues = async (req, res) => {
  const { id } = req.params
  const data = await nds.get(id)
  return res.send(data)
};

// const getCartAndValue = async (req, res) => {
//   const keys = await nds.keys();
//   const data = keys.map(async (d) => {
//     const dd = await nds.get(d);
//     arr.push(dd);
//     return dd;
//   });
//   res.send(arr);
//   arr = []
//   // return arr;
//   // res.send(arr)
//   // return keys
// };

// const clearAllCart = async (req, res) => {
//   // return await nds.clear()
//   const keys = await nds.keys()
//   console.log(keys)
//   res.send('hello world')
// }

module.exports = {
  addToCart,
  getCart,
  getCartValues,
  // getCartAndValue,
  clearCartItems
};

//clear cart
