module.exports = ({name,unit_no,balance,due,createdAt}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <style>
    .invoice-box {
      max-width: 800px;
      margin: auto;
      padding: 30px;
      border: 1px solid #eee;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      font-size: 16px;
      line-height: 24px;
      font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      color: #555;
    }

    .invoice-box table {
      width: 100%;
      line-height: inherit;
      text-align: left;
    }

    .invoice-box table td {
      padding: 5px;
      vertical-align: top;
    }

    .invoice-box table tr td:nth-child(2) {
      text-align: right;
    }

    .invoice-box table tr.top table td {
      padding-bottom: 20px;
    }

    .invoice-box table tr.top table td.title {
      font-size: 45px;
      line-height: 45px;
      color: #333;
    }

    .invoice-box table tr.information table td {
      padding-bottom: 40px;
    }

    .invoice-box table tr.heading td {
      background: #eee;
      border-bottom: 1px solid #ddd;
      font-weight: bold;
    }

    .invoice-box table tr.item td {
      border-bottom: 1px solid #eee;
    }

    .invoice-box table tr.item.last td {
      border-bottom: none;
    }

    .invoice-box table tr.total td:nth-child(2) {
      border-top: 2px solid #eee;
      font-weight: bold;
    }

    @media only screen and (max-width: 900px) {
      .invoice-box table tr.top table td {
        width: 100%;
        display: block;
        text-align: left;
        padding-bottom: 0;
      }

      .invoice-box table tr.information table td {
        width: 100%;
        display: block;
        text-align: left;
        padding-bottom: 0;
      }
    }

    /** RTL **/
    .invoice-box.rtl {
      direction: rtl;
      font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }

    .invoice-box.rtl table {
      text-align: right;
    }

    .invoice-box.rtl table tr td:nth-child(2) {
      text-align: left;
    }
  </style>
</head>
<body>
  <div>
    <div class="invoice-box mx-4">
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="2">
            <table>
              <tr>
                <td class="title">
                  <img
                    src="./logo.svg"
                    style="width: 100%; max-width: 300px"
                    alt="Logo"
                  />
                </td>
                <td>
                  Invoice #: 123<br />
                  Created: January 1, 2023<br />
                  Due: February 1, 2023
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="information">
          <td colspan="2">
            <table>
              <tr>
                <td>
                  Sparksuite, Inc.<br />
                  12345 Sunny Road<br />
                  Sunnyville, CA 12345
                </td>
                <td class="my-5">
                  <span>Invoice To: </span><br />
                  Acme Corp.<br />
                  John Doe<br />
                  john@example.com
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="heading bill">
          <td>Billing Details</td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2">
            House Number: Unit 001<br />
            House Type: PentHouse<br />
            Status: <span class="text-lime font-bold">Paid</span>
          </td>
        </tr>

        <tr class="heading">
          <td>Item</td>
          <td>Price</td>
        </tr>

        <tr class="item">
          <td>Monthly Rent</td>
          <td>$300.00</td>
        </tr>

        <tr class="item">
          <td>Water Bill</td>
          <td>$75.00</td>
        </tr>

        <tr class="item last">
          <td>Electricity Bill</td>
          <td>$10.00</td>
        </tr>

        <tr class="total">
          <td></td>
          <td>Total: $385.00</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
`

}