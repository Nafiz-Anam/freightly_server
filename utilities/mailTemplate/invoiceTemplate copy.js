module.exports = function () {
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

    .invoice-table th,
    .invoice-table td {
      padding: 10px;
      border-bottom: 1px solid #000000;
    }

    .invoice-table th {
      font-size: 14px;
    }

    .invoice-table td {
      font-size: 13px;
    }

    .parent3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    }

    .invoice-details .parent3 h2 {
      margin: 0;
      font-size: 14px;
      text-decoration: underline;
    }

    .invoice-details .parent3 .div-p {
      padding: 0 10px;
      border-left: dashed 1px;
    }

    .invoice-details .parent3 .div-c {
      padding: 0 10px;
      border-left: dashed 1px;

    }

    .invoice-details .parent3 .div-d {
      padding: 0 10px;
      border-left: dashed 1px;

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

    .striped-table tbody tr:nth-child(odd) {
      background-color: #fff;
    }

    .striped-table tbody tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .striped-table tbody tr:last-child td {
      border: none;
      background-color: #ffffff;
    }

    .striped-table td:last-child {
      text-align: right;
    }

    .striped-table th:last-child {
      text-align: right;
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
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
      margin-top: 5px;
    }

    .parent2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
      margin-top: 5px;
      height: 150px;
    }

    .div1 {
      grid-area: 1 / 1 / 2 / 2;
      text-align: left;
    }

    .div2 {
      grid-area: 1 / 2 / 2 / 3;
      text-align: right;
      padding-top: 20%;
    }

    .div3 {
      grid-area: 1 / 1 / 2 / 2;
      text-align: left;
      position: relative;
    }

    .div3 hr {
      position: absolute;
      width: 100%;
      border: 2px solid;
      bottom: 8px;
      left: 0;
    }

    .div4 {
      grid-area: 1 / 2 / 2 / 3;
      text-align: right;
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
        <div class="parent3">
          <div class="div-c">
            <h2>Contact Details</h2>
            <p>nafiz anam</p>
            <p>nafiz@gmail.com</p>
            <p>018596548555</p>
            <p>address sdgdg fsdfd fdfsdf asde fdhdf uturut</p>
          </div>
          <div class="div-p">
            <h2>Pickup Details</h2>
            <p>nafiz anam</p>
            <p>nafiz@gmail.com</p>
            <p>018596548555</p>
            <p>address sdgdg fsdfd fdfsdf asde fdhdf uturut</p>
          </div>
          <div class="div-d">
            <h2>Delivery Details</h2>
            <p>nafiz anam</p>
            <p>nafiz@gmail.com</p>
            <p>018596548555</p>
            <p>address sdgdg fsdfd fdfsdf asde fdhdf uturut</p>
          </div>

        </div>
        <div class="items">
          <table class="striped-table invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>30</td>
                <td>€30.00</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>25</td>
                <td>€25.26</td>
              </tr>
              <tr>
                <td>Michael Johnson</td>
                <td>40</td>
                <td>€56.20</td>
              </tr>
              <tr class="last-row">
                <td class="total" colspan="2">Total:</td>
                <td class="total">
                  €1120.56
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
