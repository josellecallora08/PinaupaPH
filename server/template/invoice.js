module.exports = ({response}) => {
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
      text-transform: capitalize;
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
                  <h3
                    style="width: 100%; max-width: 300px"
                    
                  >
                  PinaupaPH
                  </h3>
                </td>
                <td>
                  Invoice #: ${response?.pdf.reference}<br />
                  Created: ${new Date(response?.createdAt)?.toDateString()}<br />
                  Due: ${new Date(response?.tenant_id.monthly_due)?.toDateString()}
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
                  ${response?.tenant_id.apartment_id.name}<br />
                  ${response?.tenant_id.apartment_id.address}<br />
                  ${response?.tenant_id.apartment_id.barangay}
                </td>
                <td class="my-5">
                  <span>Invoice To: </span><br />
                  ${response?.tenant_id.user_id.username}<br />
                  ${response?.tenant_id.user_id.name}<br />
                  ${response?.tenant_id.user_id.email}
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
            House Number: Unit ${response?.tenant_id.unit_id.unit_no}<br />
            House Type: PentHouse<br />
            Status: <span class="text-lime font-bold">${response?.isPaid  ? 'Paid' : 'Unpaid'}</span>
          </td>
        </tr>

        <tr class="heading">
          <td>Item</td>
          <td>Amount</td>
        </tr>

        <tr class="item">
          <td>Monthly Rent</td>
          <td>${(response?.tenant_id.unit_id.rent)?.toLocaleString('en-PH', {
            style: 'currency',
            currency: 'PHP',
          })}</td>
        </tr>

        <tr class="item">
          <td>Previous Bill</td>
          <td>${(response?.tenant_id.balance - response?.tenant_id.unit_id.rent)?.toLocaleString('en-PH', {
            style: 'currency',
            currency: 'PHP',
          })}</td>
        </tr>

        <tr class="total">
          <td></td>
          <td>Total: ${(response?.tenant_id.balance)?.toLocaleString('en-PH', {
            style: 'currency',
            currency: 'PHP',
          })}</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
`

}