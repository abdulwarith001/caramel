const Checkout = require('../models/checkout-model')
const mongoose = require('mongoose')
const path = require('path');
const { NodeDiskStorage } = require("node-disk-storage");
const nds = new NodeDiskStorage();

const getCartKeys = async () => {
  const keys = await nds.keys();

  let resultingArr = [];
  for (let i of keys) {
    const data = await nds.get(i);
    resultingArr.push(data);
  }
  return resultingArr;
};
// , sfname, slname, scountry, sstr, stown, sstate, 
const createCheckout = async (req, res)=>{
    const {fullname, phone, state, email,address, city, zipcode, total, orderNote, pmethod} = req.body
  const checkouts = await Checkout.find({})
  const total_checkout = checkouts.length
    const details = new Checkout({
      billing_details: {
        full_name: fullname.trim(),
        phone_number: phone.trim(),
        state: state.trim(),
        email: email.trim(),
        zipcode: zipcode.trim(),
        address: address.trim(),
        city: city.trim()
      },
      // shipping_details: {
      //   first_name: sfname.trim() || null,
      //   last_name: slname.trim() || null,
      //   country: scountry || null,
      //   street_address: sstr.trim() || null,
      //   town_city: stown.trim() || null,
      //   state: sstate || null,
      // },
      product_details: {
        payment_method: pmethod,
        // subtotal: stotal,
        total: total,
      },
      Order_Note: orderNote.trim(),
      orderId: total_checkout + 1,
      ordered_product:  await getCartKeys()
    });

    const newCheckout = await Checkout.create(details)
      const id = mongoose.Types.ObjectId(newCheckout)
    const url = `/received-order.html?key=${id}?uuid=${newCheckout.orderId}`
   await nds.clear()
    res.status(201).redirect(url)
}

const getACheckout = async(req, res)=>{
    try {
        const { id } = req.params;

        const checkout = await Checkout.findOne({ _id: id})
      
        if (!checkout) {
          return res.status(404).json({
            success: false,
            message: `No order with id "${id}" was not found on the database...`,
            data: null
          });
        }
          res.status(200).json({sucess: true, message: `Checkout received and sent to the database`, data: checkout}) 
    } catch (error) {
        res.status(500).json({sucess:false, message: 'Sorry, somethin went wrong', data: null})
    }
}

const getAllCheckout = async (req, res) => {
  const checkouts = await Checkout.find({})
  const user = req.user;
    res
      .status(200)
      .json({
        sucess: true,
        message: `All checkouts have been gotten from the database`,
        data: checkouts,
        username: user,
        total_checkout: checkouts.length
      });

};
module.exports = {
    createCheckout,
    getACheckout,
    getAllCheckout
}
