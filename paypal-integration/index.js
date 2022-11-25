const express = require('express')
// const paypal = require('paypal-rest-sdk')
const PORT = 3000
const {createOrder,capturePayment} = require('./paypal-api')

// paypal.configure({
//     'mode': 'sandbox', //sandbox or live
//   'client_id': 'ATlA3dbzxcLD6P0_07XDZDiEwp2NiP35PjE9kXFuJLHLM4HoHdZRiXoCzVTfR3MulR3WDLA1xTic3Y5K',
//   'client_secret': 'EE_9yUYeB3AXhwM7xjqG8GrjVbdLeAUukx63h54hxBQ5cwmJOOFFKF8UN4TxFdJsarIGxL_cF8sYGknn'
// })

const app= express()
app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));
// app.post('/pay',(req,res)=>{
//     const create_payment_json={
//         "intent": "sale",
//         "payer": {
//             "payment_method": "paypal"
//         },
//         "redirect_urls": {
//             "return_url": "http://localhost:3000/success",
//             "cancel_url": "http://localhost:3000/cancel"
//         },
//         "transactions": [{
//             "item_list": {
//                 "items": [{
//                     "name": "Red Sox Hat",
//                     "sku": "001",
//                     "price": "25.00",
//                     "currency": "USD",
//                     "quantity": 1
//                 }]
//             },
//             "amount": {
//                 "currency": "USD",
//                 "total": "25.00"
//             },
//             "description": "Hat for the best team ever"
//         }]
//     };
    
//     app.get('/success', (req, res) => {
//         const payerId = req.query.PayerID;
//         const paymentId = req.query.paymentId;
      
//         const execute_payment_json = {
//           "payer_id": payerId,
//           "transactions": [{
//               "amount": {
//                   "currency": "USD",
//                   "total": "25.00"
//               }
//           }]
//         };

//         paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//             if (error) {
//                 console.log(error.response);
//                 throw error;
//             } else {
//                 console.log(JSON.stringify(payment));
//                 res.send('Success');
//             }
//         });
//         });

//         paypal.payment.create(create_payment_json, function (error, payment) {
//             if (error) {
//                 throw error;
//             } else {
//                 for(let i = 0;i < payment.links.length;i++){
//                   if(payment.links[i].rel === 'approval_url'){
//                     res.redirect(payment.links[i].href);
//                   }
//                 }
//             }
//           });
// })

// app.get('/cancel', (req, res) => res.send('Cancelled'));
app.use(express.static("public"));

app.post("/api/orders", async (req, res) => {
  try {
    const order = await createOrder();
   
    res.json(order.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  try {
    const captureData = await capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));