module.exports = ({ response }) => {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
      <title>Contract</title>
    </head>
    <style>
    .poppins-regular {
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      font-style: normal;
    }
    </style>
    <body style="display:flex;align-items: center; justify-content:center;width:700px;margin:20px auto auto auto; height:100vh">
      <div style="width:100%;margin:auto;height:100%;" >
        <div style="width: 90%; display: flex; justify-content:space-between; align-items:center;">
          <span style="width: fit-content; font-size:30px;font-style:bold  ">
         KONTRATA NG PAGPAPAUPA</span>
        </div>
        <hr style="border: 1px solid #000;" />
        <div class="content">
          <p>
            <span>Lokasyon:</span>
            <span>${response?.apartment_id.address}, ${response?.apartment_id.barangay}, ${response?.apartment_id.province}</span>
          </p>
          <p style="font-weight: 600; font-size: 1.2rem;">SA MGA KINAUUKULANG NITO,</p>
  
          <p>Ang kontratang ito ay nababago taon-taon at ang may-ari ng bahay ay may karapatang magpaalis sa umuupa kapag nilabag ang mga sumusunod;</p>
          <ul>
            <li>
              Ang upa o renta sa bawat buwan ay nagkakahalaga
              <span>${response?.unit_id.rent}</span>
            </li>
            <li>
              Dapat ay may paunang isang (1) buwan na upa o renta sa isang (1) buwang deposito at ito ay magagamit lamang kapag paalis na ang naupa at ito ay pambayad sa huling dalawang buwang upa. Ang isang buwang deposito naman ay nakalaan para sa maiiwang konsumo ng tubig at kuryente at sa mga nasirang pasilidad ng bahay kung sakaling mayroon man.
            </li>
            <li>
              Kapag hindi makabayad ng isang buwang upa o renta sa bahay, ang may-ari ay may karapatang abisuhan ang umuupa na umalis agad-agad; at dumulog sa kinauukulan kung hindi sumunod.
            </li>
            <li>
              Ang isang (1) buwang deposito at isang (1) buwang advance na bayad ay;
              <ul>
                <li>
                  Gagamitin lamang ang ikalawang buwang advance kapag nagdesisyon na ang umuupa na aalis.
                </li>
                <li>
                  Ang isang buwang deposito naman ay gagamitin para sa naiwang konsumo ng tubig at kuryente at kung mayroong nasirang pasilidad ng bahay kung sakali man. Pero kung di umabot ng 6 na buwan ng ang pangungupahan ay hindi na ito maisasauli pa.
                </li>
                <li>
                  Ang isang buwang advance ay hindi maaring kuhanin bagkus ito ay dapat ikonsumo ng umuupa hanggang sa araw ng kanilang pag alis sa paupahan.
                </li>
                <li>
                  Kapag ang umuupa ay mapaais dahil sa paglabag sa mga patakaran ng nagpapa upa, hindi na maaring makuha pa ang dalawang buwang advance kahit ito ay may nalalabi pang araw sa paupahan.
                </li>
              </ul>
            </li>
            <li>
              Ang lahat ng pasilidad ng bahay ay maayos na gumagana pag lipat ng umuupa kaya ano mang masira ay dapat ipagawa ng umuupa at hindi ibabawas sa renta ng bahay kundi sa sariling gastos ng umuupa.
            </li>
            <li>
              Sagot ng umuupa ang lahat ng konsumo sa tubig, kuryente at homeowner's fee buwan buwan hanggat sila ay umuupa pa sa bahay. Responsibilidad din ng umuupa na panatilihing malinis sa bahay at paligid nito at pati na rin ang katahimikan.
            </li>
            <li>
              Bawal mag-ipon ng flammable o burnable materials o anumang bagay na maaring pagmulan ng sunog sa bahay. Pananagutan ng umuupa anu man ang mangyari sa bahay habang siya ay naka upa dito.
            </li>
            <li>
              Bawal magpako sa mga dingding ng bahay. Kung sakaling may ilalagay na dekorasyon o kurtina ay dapat abisuhan ang may-ari ukol dito para walang masirang pasilidad ng bahay.
            </li>
            <li>
              Bawal sobrang ingay, malakas na tunog ng radyo o tv, videoke, etc.
            </li>
            <li>
              Ano mang pangyayari o nasira sa bahay ay dapat ipaalam agad agad sa may-ari ng bahay;
            </li>
            <li>
              Isauli ang susi sa may-ari ng bahay sa oras o araw na lumipat na sa ibang tirahan. Bawal iwanan ito kung kani-kanino. Dapat may release order o clearance galing sa homeowner's bago aalis.
            </li>
          </ul>
          <div style="margin-top: 15px;">
            <div>
              <div class="signatory">
                <p style="font-size:15px">
                  Wendell C. Ibias
                </p>
              </div>
              <div class="signatory">
                <p style="font-size:15px">
                  ${response?.user_id?.name}
                </p>
              </div>
            </div>
  
            <p>Nilagdaan namin ang kasunduang ito ngayong ________, ng _____________ dito sa ${response?.apartment_id.address}, ${response?.apartment_id.barangay}, ${response?.apartment_id.province}</p>
  
            <p>Petsa ng simula ng kontrata: ${new Date().toDateString()}</p>
            <p>Araw ng bayad: ${new Date(response?.monthly_due).getDate()} of the Month</p>
  
            <p>Mga saksi sa kasunduan</p>
            <p>1.)</p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `
}
