const axios = require('axios')
require('url').URLSearchParams
const base = "https://api-m.sandbox.paypal.com";

async function createOrder() {
   
  const data = await generateAccessToken();

  const url = `${base}/v2/checkout/orders`;
  const response = await axios.post(url, 
    {
        'intent': 'CAPTURE',
        'purchase_units': [
            {
                'reference_id': 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
                'amount': {
                    'currency_code': 'USD',
                    'value': '100.00'
                }
            }
        ],
        'payment_source': {
            'paypal': {
                'experience_context': {
                    'payment_method_preference': 'IMMEDIATE_PAYMENT_REQUIRED',
                    'payment_method_selected': 'PAYPAL',
                    'brand_name': 'EXAMPLE INC',
                    'locale': 'en-US',
                    'landing_page': 'LOGIN',
                    'shipping_preference': 'SET_PROVIDED_ADDRESS',
                    'user_action': 'PAY_NOW',
                    'return_url': 'http://localhost:3000/success',
                    'cancel_url': 'http://localhost:3000/cancel'
                }
            }
        }
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.access_token}`,
            'PayPal-Request-Id': data.app_id
        }
    }
  );
  console.log(response,'response')
  return handleResponse(response);
}

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await axios.post(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}

async function generateAccessToken() {

let response
try{
 response = await axios.post(`${base}/v1/oauth2/token`, 
    new URLSearchParams({
        'grant_type': 'client_credentials'
    }),
    {
        auth: {
            username: 'ATlA3dbzxcLD6P0_07XDZDiEwp2NiP35PjE9kXFuJLHLM4HoHdZRiXoCzVTfR3MulR3WDLA1xTic3Y5K',
            password: 'EE_9yUYeB3AXhwM7xjqG8GrjVbdLeAUukx63h54hxBQ5cwmJOOFFKF8UN4TxFdJsarIGxL_cF8sYGknn'
        }
    }
  )
}
catch(error){
    console.log(error,'error')
}
  const jsonData = await handleResponse(response);
  console.log(jsonData.data)
  return jsonData.data;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response;
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}

module.exports ={
    createOrder,
    capturePayment,
    generateAccessToken
}