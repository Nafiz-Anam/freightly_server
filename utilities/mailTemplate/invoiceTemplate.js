module.exports = function (emailData) {
    let items = emailData?.invoice_details;
    let item_table = "";
    for (let val of items) {
        let temp = `<tr>
                      <td>${val.description}</td>
                      <td class="right-align">€${val.price}</td>
                    </tr>`;
        item_table += temp;
    }
    // console.log(item_table);
    return `<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Invoice Email</title>
  <style>
    body,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #000000;
    }

    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 10px;
      background-color: #000000;
      border-radius: 5px;
    }

    .contain {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
    }

    /* header area  */
    .header {
      padding-bottom: 20px;
      margin: 20px 0;
      border-bottom: solid 3px #000;
      text-align: left;
    }

    .logo {
      max-width: 60%;
      height: auto;
    }

    /* invoice area  */
    .invoice-details {
      margin: 30px 0;
    }

    .invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin: 50px 0 30px 0;
    }

    /* .invoice-table th, */
    .invoice-table td {
      padding: 10px;
      border-top: 1px solid #000000;
    }

    .invoice-table th {
      font-size: 14px;
    }

    .invoice-table td {
      font-size: 13px;
    }

    .parent3 h2 {
      margin: 0;
      font-size: 14px;
      text-decoration: underline;
    }

    .parent3 p {
      margin: 0px;
      font-size: 13px;
    }

    .striped-table th,
    .striped-table td {
      padding: 8px;
      text-align: left;
    }

    .striped-table thead th {
      background-color: #f2f2f2;
    }

    .striped-table .last-row td {
      font-size: 18px;
      font-weight: bold;
    }

    /* footer style  */
    .footer {
      text-align: center;
      margin-top: 30px;
    }

    .parent {
      display: table;
      width: 100%;
      margin-top: 5px;
      table-layout: fixed;
    }

    .parent2 {
      display: table;
      width: 100%;
      margin-top: 5px;
      height: 150px;
    }

    .div1 {
      text-align: left;
    }
    .div2{
      padding-top: 50px;
    }
    .div2,.div4 {
      text-align: right;
    }

    .div1,
    .div2,
    .div3,
    .div4 {
      display: table-cell;
      vertical-align: top;
    }

    .div3 {
      position: relative;
    }

    .div3 hr {
      position: absolute;
      width: 100%;
      border: 2px solid;
      bottom: 8px;
      left: 0;
    }

    .div4 h2 {
      margin: 0px;
      font-size: 18px;
    }

    .div1 .name {
      margin: 0;
      font-size: 18px;
    }

    .div1 p,
    .div2 p {
      margin: 2px 0px;
      font-size: 12px;
    }

    .div-c,
    .div-p,
    .div-d {
      border-left: 1px dashed;
      padding: 0 10px
    }

    .striped-table .right-align {
      text-align: right;
    }

    .striped-table .right-center {
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="contain">
      <!-- headings -->
      <div class="header">
        <img class="logo" src="https://i.ibb.co/dbG2fg1/freightly-invoice-logo.png" alt="Freightly Logo">
      </div>

      <!-- invoice details  -->
      <div class="invoice-details">
        <table class="parent3">
          <tr>
            <td class="div-c">
              <h2>Contact Details</h2>
              <p>${emailData.contactDetails.customerName}</p>
              <p>${emailData.contactDetails.customer_email}</p>
              <p>${emailData.contactDetails.customer_phone}</p>
              <p>${emailData.contactDetails.customer_address}</p>
            </td>
            <td class="div-p">
              <h2>Pickup Details</h2>
              <p>${emailData.pickupContact.pickup_contact_name}</p>
              <p>${emailData.pickupContact.pickup_contact_email}</p>
              <p>${emailData.pickupContact.pickup_contact_phone}</p>
              <p>${emailData.pickupContact.pickup_contact_address}</p>
            </td>
            <td class="div-d">
              <h2>Delivery Details</h2>
              <p>${emailData.deliveryContact.delivery_contact_name}</p>
              <p>${emailData.deliveryContact.delivery_contact_email}</p>
              <p>${emailData.deliveryContact.delivery_contact_phone}</p>
              <p>${emailData.deliveryContact.delivery_contact_address}</p>
            </td>
          </tr>
        </table>
        <div class="items">
          <table class="striped-table invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th class="right-align">Price</th>
              </tr>
            </thead>
            <tbody>
              ${item_table}
              <tr class="last-row">
                <td class="total">Total:</td>
                <td class="total right-align">
                  €${emailData.total_order_price}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- footer area here  -->
      <div class="footer">
        <div class="parent">
          <div class="div3">
            <hr />
          </div>
          <div class="div4">
            <h2>THANK YOU</h2>
          </div>
        </div>
        <div class="parent2">
          <div class="div1">
            <h2 class="name">Freightly</h2>
            <p>Keizersweg 75</p>
            <p>1171XC Badhoevedorp</p>
            <p>Tel +31 (0) 6 410 27745</p>
            <p>www.freightly.nl</p>
            <p>info@freightly.nl</p>
          </div>
          <div class="div2">
            <p>Btw-nummer: NL004416601B03</p>
            <p>KVK-nummer 88895645</p>
            <p>IBAN: NL86 BUNQ 2084 3906 80</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</body>

</html>`;
};
