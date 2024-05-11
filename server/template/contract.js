module.exports = ({ response }) => {
  console.log(response)
  return `

  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet">

</head>

<body style="font-family: Poppins;">
  <div style="display: flex; justify-content: center; align-items: middle; font-size: 12px;">
    <div
      style="padding-top: 1.5rem; padding-left: 0.5in; padding-right: 0.5in; 
      width: 8.5in; min-height: 11in; margin-top: 1rem; margin-bottom: 10rem;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1); 
      background-color: #ffffff; ">
      <div
        style="font-family: Poppins; padding-bottom: 1rem; display: flex; justify-content: space-between; min-padding-bottom: 1rem; border-bottom: 4px solid #ccc;">
        <div>
          <img src="logo.svg" style="height: 1.5rem; width: auto;" />
        </div>
        <p style=" padding-top: 0.5rem; font-size: 20px; font-weight: bold; margin-bottom: 1.5rem;">
          KONTRATA NG PAGPAPAUPA
        </p>
      </div>

      <p style="font-family: Poppins; white-space: nowrap; margin-bottom: 3rem;  margin-top: 40px;">
        <span style="font-weight: bold; font-family: Poppins;">Lokasyon: </span>${response.tenant_id?.apartment_id.address}, ${response.tenant_id?.apartment_id.barangay}, ${response.tenant_id?.apartment_id.province}
      </p>
      <p style="font-family: serif;  margin-bottom: 1rem; font-weight: bold;  font-family: Poppins;">
        SA MGA KINAUUKULANG NITO,
      </p>

      <p style="font-family: serif;  margin-bottom: 1rem;font-family: Poppins;">
        Ang kontratang ito ay nababago taon-taon at ang may-ari ng bahay ay may karapatang magpaalis sa umuupa kapag
        nilabag ang mga sumusunod;
      </p>
      <p>
        1.) Ang upa o renta sa bawat buwan ay nagkakahalaga ng{' '}
        <span className="font-bold">${response?.tenant_id?.unit_id.rent}</span>
      </p>

      <p>
        2.) Dapat ay may paunang isang (1) buwan na upa o renta sa isang (1)
        buwang desposito at ito ay magagamit lamang kapag paalis na ang
        naupa at ito ay pambayad sa huling dalawang buwang upa. Ang isang
        buwang deposito naman ay nakalaan para sa maiiwang konsumo ng tubig
        at kuryente at sa mga nasirang pasilidad ng bahay kung sakaling
        mayroon man.
      </p>

      <p>
        3.) Kapag hindi makabayad ng isang buwang upa o renta sa bahay, ang
        may-ari ay may karapatang abisuhan ang umuupa na umalis agad-agad;
        at dumulog sa kinauukulan kung hindi sumunod.
      </p>

      <p>
        4.) Ang isang (1) buwang deposito at isang (1) buwang advance na
        bayad ay;
      </p>
      <p>
        A.) Gagamitin lamang ang ikalawang buwang advavnce kapag nagdesisyon
        na ang umuupa na aalis.
      </p>
      <p>
        B.) Ang isang buwang deposito naman ay gagamitin para sa naiwang
        konsumo ng tubig at kuryente at kung mayroong nasirang pasilidad ng
        bahay kung sakali man. Pero kung di umabot ng 6 na buwan ng ang
        pangungupahan ay hindi na ito maisasauli pa.
      </p>
      <p>
        C.) Ang isang buwang advance ay hindi maaring kuhanin bagkus ito ay
        dapat ikonsumo ng umuupa hanggang sa araw ng kanilang pag alis sa
        paupahan.
      </p>
      <p>
        D.) Kapag ang umuupa ay mapaais dahil sa paglabag sa mga patakaran
        ng nagpapa upa, hindi na maaring makuha pa ang dalawang buwang
        advance kahit ito ay may nalalabi pang araw sa paupahan.
      </p>

      <p>
        5.) Ang lahat ng pasilidad ng bahay ay maayos na gumagana pag lipat
        ng umuupa kaya ano mang masira ay dapat ipagawa ng umuupa at hindi
        ibabawas sa renta ng bahay kundi sa sariling gastos ng umuupa.
      </p>
      <p>
        6.) sagot ng umuupa ang lahat ng konsumo sa tubig, kuryente at
        homeowner's fee buwan buwan hanggat sila ay umuupa pa sa bahay.
        Responsibilidad din ng umuupa na panatilihing malinis sa bahay at
        paligid nito at pati na rin ang katahimikan.
      </p>
      <p>
        7.) Bawal mag-ipon ng flammable o burnable materials o anumang bagay
        na maaring pagmulan ng sunog sa bahay. Pananagutan ng umuupa anu man
        ang mangyari sa bahay habang siya ay naka upa dito.
      </p>
      <p>
        8.) Bawal magpako sa mga dingding ng bahay. Kung sakaling may
        ilalagay na dekorasyon o kurtina ay dapat abisuhan ang may-ari ukol
        dito para walang masirang pasilidad ng bahay.
      </p>
      <p>
        9.) Bawal sobrang ingay, malakas na tunog ng radyo o tv, videoke,
        etc.
      </p>
      <p>
        10.) Ano mang pangyayari o nasira sa bahay ay dapat ipaalam agad
        agad sa may-ari ng bahay;
      </p>
      <p>
        11.) Isauli ang susi sa may-ari ng bahay sa oras o araw na lumipat
        na sa ibang tirahan. Bawal iwanan ito kung kani-kanino. Dapat may
        release order o cleaerance galing sa homeowner's bago aalis.
      </p>



    </div>
  </div>
  <div style="display: flex; justify-content: center; align-items: middle; font-size: 12px;">
    <div
      style="padding-left: 0.5in; padding-top: 5rem; padding-right: 0.5in; width: 8.5in; min-height: 11in;
       box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1); background-color: #ffffff;
       margin-top: 2rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <hr>
          <p style="text-align: center;">
            Pangalan at Lagda ng Nagpapa upa
          </p>
        </div>

        <div>
          <hr>
          <p>
            Pangalan at Lagda ng Umuupa
          </p>
        </div>

      </div>

      <p style="margin-top: 200px">
        Nilagdaan namin ang kasunduang ito ngayong ________, ng
        _____________ dito sa ${response?.tenant_id?.apartment_id.address}, ${response?.tenant_id?.apartment_id.barangay}, ${response?.tenant_id?.apartment_id.province}
      </p>

      <p style="margin-top: 100px;">
        Petsa ng simula ng kontrata: ${new Date().toDateString()}
      </p>
      <p>
        Araw ng bayad: ${new Date(response?.tenant_id?.monthly_due).getDate()} of the Month
      </p>
      <div className="h-60 lg:h-60"></div>

      ${response?.witnesses >= 1 && `<p style="margin-top: 100px;">
        Mga saksi sa kasunduan
      </p>`}
      
      ${response?.witnesses?.map((val, key) => (
    `<p>
      1.) ${val.name}
    </p>`
  ))}

    </div>
  </div>
</body>

</html>
`
}
