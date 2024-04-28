module.exports = ({ response }) => {
  const today = new Date()
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  let month = months[today.getMonth()]
  let date = today.getDate()
  if (date < 10) {
    date = '0' + date
  }
  let year = today.getFullYear()

  return `

  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kontrata sa Pagpapaupa</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f7f7f7;
          }
          .container {
              max-width: 800px;
              margin: 20px auto;
              padding: 20px;
              border-radius: 10px;
              background-color: #fff;
  
          }
          h1 {
              text-align: center;
              color: #333;
              margin-bottom: 20px;
          }
          p {
              margin-bottom: 10px;
              color: #666;
              text-align: justify;
              line-height: 1.2;
          }
          ol {
              margin-left: 20px;
          }
          ol li {
              margin-bottom: 10px;
          }
          .signature {
              margin-top: 30px;
              text-align: center;
          }
          
          .signature p {
              margin-top: 0;
              color: #666;
              font-style: italic;
          }
	.sign-container{
display:flex;
align-items: center;
gap:50px;
	}
         
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Kontrata sa Pagpapaupa</h1>
          <p><strong>Lokasyon:</strong> ${response?.apartment_id.address}</p>
          <p>Ang kontratang ito ay nagbabago taon-taon. Ang may-ari ng bahay ay may karapatang magpaalis sa umuupa kapag nilabag ang mga sumusunod:</p>
          <ol>
              <li>Ang upa o renta sa bawat buwan ay nagkakahalaga ng ${response?.unit_id.rent}.</li>
              <li>Dapat mayroong paunang isang (1) buwang upa o renta at isang buwang deposito. Ang paunang bayad na ito ay magagamit lamang kapag paalis na ang umuupa at ito ay pambayad sa huling dalawang buwang upa. Ang isang buwang deposito ay nakalaan para sa mga konsumo ng tubig at kuryente at sa mga nasirang pasilidad ng bahay, kung mayroon man.</li>
              <li>Kapag hindi makabayad ng isang buwang upa o renta sa bahay, may karapatan ang may-ari na abisuhan ang umuupa na umalis agad-agad at dumulong sa kinauukulan kung hindi sumunod.</li>
              <li>Ang isang (1) buwan deposito at isang (1) buwang advance na bayad ay:
                  <ol type="a">
                      <li>Gagamitin lamang ang ikalawang buwang advance kapag nadesision na ang umuupa na aalis.</li>
                      <li>Ang isang buwang deposito naman ay gagamitin para sa naiwang konsumo ng tubig at kuryente at kung mayroong nasirang pasilidad ng bahay kung sakali man. Pero kung di umabot ng 6 na buwan ang pangungupahan ay hindi na ito maisasauli pa.</li>
                      <li>Ang isang buwang advance ay hindi maaring kuhanin bagkus ito ay dapat ikonsumo ng umuupa sa hanggang sa araw ng kanilang pag-alis sa paupahan.</li>
                      <li>Kapag ang umuupa ay mapaalis dahil sa paglabag sa mga patakaran ng nagpapaupa, hindi na maaring makuha pa ang dalawang buwang advance kahit ito ay may nalalabi pang araw sa paupahan.</li>
                  </ol>
              </li>
              <li>Ang lahat ng pasilidad ng bahay ay maayos nag-gumagana paglipat ng umuupa kaya ano mang masira ay dapat ipagawa ng umuupa at hindi ibabawas sa renta ng bahay kundi sa sariling gastos ng umuupa.</li>
              <li>Sagot ng umuupa ang lahat ng konsumo sa tubig, kuryente, at homeowner’s fee buwan-buwan hanggat sila ay umuupa pa sa bahay. Responsibilidad din ng umuupa na panatilihin ang malinis na kalagayan ng bahay at paligid nito at pati na rin ang katahimikan.</li>
              <li>Bawal mag-ipon ng flammable o burnable materials o anumang bagay na maaring pagmulan ng sunog sa bahay. Pananagutan ng umuupa anuman ang mangyari sa bahay habang siya ay nakaupa dito.</li>
              <li>Bawal magpako sa mga dingding ng bahay. Kung sakaling may ilalagay na dekorasyon o kurtina ay dapat abisuhan ang may-ari ukol dito para walang masirang pasilidad ng bahay.</li>
              <li>Bawal ang sobrang ingay, malakas na tunog ng radyo o TV, videoke, at iba pa.</li>
              <li>Ano mang pangyayari o nasira sa bahay ay dapat ipaalam agad-agad sa may-ari ng bahay.</li>
              <li>Isauli ang susi sa may-ari ng bahay sa oras o araw na lumipat ng sa ibang tirahan. Bawal iwanan ito kung kani-kanino. Dapat may release order o clearance galing sa homeowners’s bago aalis.</li>
          </ol>
          <p>Nilagdaan namin ang kasunduang ito ngayong ${response?.createdAt} dito sa ${response?.apartment_id.address}, ${response?.apartment_id.province} ${response?.apartment_id.barangay}.</p>
          <p>Petsa ng simula ng kontrata: (date)</p>
          <div class="sign-container">
          <div  class="signature">
              <p>Wendell C. Ibias</p>
		<p class="title">Owner</p>
          </div>
          <div  class="signature">
              <p>${response?.user_id.name}</p>
<p class="title">Rentee</p>
          </div>
          </div>
      </div>
  </body>
  </html>
`
}
