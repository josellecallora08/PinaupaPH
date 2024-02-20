import React from 'react';
import './Invoice.css';
import Logo from "/pinaupa-logo.svg";

const InvoiceFormat = () => {
  return (
    <div>
      <div className="invoice-box mx-4">
        <table cellPadding="0" cellSpacing="0">
          <tr className="top">
            <td colSpan="2">
              <table>
                <tr>
                  <td className="title">
                    <img
                      src={Logo}
                      style={{ width: '100%', maxWidth: '300px' }}
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



          <tr className="information">
            <td colSpan="2">
              <table>
                <tr>
                  <td>
                    Sparksuite, Inc.<br />
                    12345 Sunny Road<br />
                    Sunnyville, CA 12345
                  </td>

                  <td className='my-5'>
                  <span>Invoice To: </span><br />
                    Acme Corp.<br />
                    John Doe<br />
                    john@example.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="heading bill">
            <td>Billing Details</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="2">
              House Number: Unit 001<br />
              House Type: PentHouse<br />
              Status: <span className='text-lime font-bold'>Paid</span>
            </td>
          </tr>

          <tr className="heading">
            <td>Item</td>
            <td>Price</td>
          </tr>

          <tr className="item">
            <td>Monthly Rent</td>
            <td>$300.00</td>
          </tr>

          <tr className="item">
            <td>Water Bill</td>
            <td>$75.00</td>
          </tr>

          <tr className="item last">
            <td>Electricity Bill</td>
            <td>$10.00</td>
          </tr>

          <tr className="total">
            <td></td>
            <td>Total: $385.00</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default InvoiceFormat;
