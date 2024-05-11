import React, { useEffect } from 'react'
import pinaupa from '/logo.svg'
import { Dropdown } from 'rsuite'
import { BsDownload } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
//optional
import 'rsuite/Dropdown/styles/index.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDocument, generateDocument } from '../../features/documents'

const LeaseView = () => {
  const { contract_id } = useParams()
  const contract = useSelector((state) => state.docs.single)
  const dispatch = useDispatch()
  const handleDownload = () => {
    dispatch(generateDocument(contract_id))
  }
  useEffect(() => {
    dispatch(fetchDocument(contract_id))
  }, [])
  console.log(contract)
  return (
    <div className="flex flex-col bg-white1">
      <div className="pl-5 pt-5 font-bold text-base">
        <Link to={'/dashboard'} className="hover:underline">
          DOCUMENTS
        </Link>
        /
        <Link to={`/document/lease-agreement`} className="hover:underline">
          LEASE AGREEMENTS
        </Link>
      </div>
      <Dropdown
        title={'Select Action'}
        className="ml-auto mr-6 border border-light-gray rounded-lg"
      >
        <Dropdown.Item
          onClick={handleDownload}
          icon={<BsDownload className="mr-2" />}
          className="w-32 flex flex-row items-center"
        >
          Download
        </Dropdown.Item>
      </Dropdown>

      <div className="flex justify-center align-middle">

        <div className=" p-6 xl:w-[13.6in] lg:w-[6.8in] xl:min-h-[17.6in] lg:min-h-[8.8in] xl:p-[1in] lg:p-[0.5in] m-[1rem] shadow-lg shadow-light-gray bg-white ">
          <div className='pb-4 flex justify-between min-pb-4 border-b-4 border-gray-400'>
            <figure>
              <img src={pinaupa} className='h-12 lg:h-20' />
            </figure>
            <p className="pt-2 lg:pt-4 xl:text-4xl lg:text-xl font-bold font-serif  xl:mb-12 lg:mb-2 ">
              KONTRATA SA PAGPAPAUPA
            </p>
          </div>


          <p className="font-serif lg:text-nowrap xl:mb-12 xl:text-xl lg:text-sm pb-6 pt-6">
            <span className="font-bold">Lokasyon: </span>{contract?.tenant_id.apartment_id.address}, {contract?.tenant_id.apartment_id.barangay}, {contract?.tenant_id.apartment_id.province}
          </p>
          <p className=" xl:text-xl lg:text-sm font-serif xl:mb-2 lg:mb-1 pb-4 font-bold">
            {' '}
            SA MGA KINAUUKULANG NITO,
          </p>

          <p className=" xl:text-xl lg:text-sm font-serif xl:mb-2 lg:mb-1">
            {' '}
            Ang kontratang ito ay nababago taon-taon at ang may-ari ng bahay ay
            may karapatang magpaalis sa umuupa kapag nilabag ang mga sumusunod;
          </p>
          {/* <p className="font-serif text-xl mb-4"></p> */}
          <p className="font-serif xl:text-xl lg:text-sm ml-[2.5rem] xl:mb-6 lg:mb-3">
            1.) Ang upa o renta sa bawat buwan ay nagkakahalaga ng{' '}
            <span className="font-bold">{(contract?.tenant_id.unit_id.rent)?.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</span>
          </p>
          <p className="font-serif xl:text-xl lg:text-sm ml-[2.5rem] xl:leading-8 lg:leading-5">
            2.) Dapat ay may paunang isang (1) buwan na upa o renta sa isang (1)
            buwang desposito at ito ay magagamit lamang kapag paalis na ang
            naupa at ito ay pambayad sa huling dalawang buwang upa. Ang isang
            buwang deposito naman ay nakalaan para sa maiiwang konsumo ng tubig
            at kuryente at sa mga nasirang pasilidad ng bahay kung sakaling
            mayroon man.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm ml-[2.5rem] xl:leading-8 lg:leading-5">
            3.) Kapag hindi makabayad ng isang buwang upa o renta sa bahay, ang
            may-ari ay may karapatang abisuhan ang umuupa na umalis agad-agad;
            at dumulog sa kinauukulan kung hindi sumunod.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm  ml-[2.5rem] xl:leading-8 lg:leading-5">
            4.) Ang isang (1) buwang deposito at isang (1) buwang advance na
            bayad ay;
          </p>
          <p className="font-serif xl:text-xl lg:text-sm  ml-[5rem] xl:leading-8 lg:leading-5">
            A.) Gagamitin lamang ang ikalawang buwang advavnce kapag nagdesisyon
            na ang umuupa na aalis.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm ml-[5rem] xl:leading-8 lg:leading-5">
            B.) Ang isang buwang deposito naman ay gagamitin para sa naiwang
            konsumo ng tubig at kuryente at kung mayroong nasirang pasilidad ng
            bahay kung sakali man. Pero kung di umabot ng 6 na buwan ng ang
            pangungupahan ay hindi na ito maisasauli pa.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm  ml-[5rem] xl:leading-8 lg:leading-5">
            C.) Ang isang buwang advance ay hindi maaring kuhanin bagkus ito ay
            dapat ikonsumo ng umuupa hanggang sa araw ng kanilang pag alis sa
            paupahan.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm  ml-[5rem] xl:leading-8 lg:leading-5">
            D.) Kapag ang umuupa ay mapaais dahil sa paglabag sa mga patakaran
            ng nagpapa upa, hindi na maaring makuha pa ang dalawang buwang
            advance kahit ito ay may nalalabi pang araw sa paupahan.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm ml-[2.5rem] xl:leading-8 lg:leading-5">
            5.) Ang lahat ng pasilidad ng bahay ay maayos na gumagana pag lipat
            ng umuupa kaya ano mang masira ay dapat ipagawa ng umuupa at hindi
            ibabawas sa renta ng bahay kundi sa sariling gastos ng umuupa.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm  ml-[2.5rem] xl:leading-8 lg:leading-5">
            6.) sagot ng umuupa ang lahat ng konsumo sa tubig, kuryente at
            homeowner's fee buwan buwan hanggat sila ay umuupa pa sa bahay.
            Responsibilidad din ng umuupa na panatilihing malinis sa bahay at
            paligid nito at pati na rin ang katahimikan.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm  ml-[2.5rem] xl:leading-8 lg:leading-5">
            7.) Bawal mag-ipon ng flammable o burnable materials o anumang bagay
            na maaring pagmulan ng sunog sa bahay. Pananagutan ng umuupa anu man
            ang mangyari sa bahay habang siya ay naka upa dito.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm  ml-[2.5rem] xl:leading-8 lg:leading-5">
            8.) Bawal magpako sa mga dingding ng bahay. Kung sakaling may
            ilalagay na dekorasyon o kurtina ay dapat abisuhan ang may-ari ukol
            dito para walang masirang pasilidad ng bahay.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm ml-[2.5rem] xl:leading-8 lg:leading-5">
            9.) Bawal sobrang ingay, malakas na tunog ng radyo o tv, videoke,
            etc.
          </p>
          <p className="font-serif xl:text-xl lg:text-sm  ml-[2.5rem] xl:leading-8 lg:leading-5">
            10.) Ano mang pangyayari o nasira sa bahay ay dapat ipaalam agad
            agad sa may-ari ng bahay;
          </p>
          <p className="font-serif xl:text-xl lg:text-sm ml-[2.5rem] xl:leading-8 lg:leading-5 mt-6">
            11.) Isauli ang susi sa may-ari ng bahay sa oras o araw na lumipat
            na sa ibang tirahan. Bawal iwanan ito kung kani-kanino. Dapat may
            release order o cleaerance galing sa homeowner's bago aalis.
          </p>
        </div>
      </div>
      <div className="flex justify-center align-middle">
        <div className=" pl-6 pt-20 pr-6 xl:w-[13.6in] lg:w-[6.8in] xl:min-h-[17.6in] lg:min-h-[8.8in] xl:p-[1in] lg:p-[0.5in] m-[1rem] shadow-lg shadow-light-gray bg-white ">
          <div className="flex flex-row xl:mx-[2.5rem] lg:mx-[1.rem] xl:mt-60 lg:mt-40">
            <p className=" xl:text-xl lg:text-sm">
              ____________________________________________
            </p>
            <div className="w-full"></div>
            <p className="xl:text-xl lg:text-sm">
              ____________________________________________
            </p>
          </div>
          <div className="flex flex-row xl:mx-[4rem] lg:mx-[1rem]">
            <p className="xl:text-xl lg:text-sm font-serif text-nowrap">
              Pangalan at Lagda ng Nagpapa upa
            </p>
            <div className="w-full"></div>
            <p className="xl:text-xl lg:text-sm font-serif text-nowrap ">
              Pangalan at Lagda ng Umuupa
            </p>
          </div>

          <p className="pt-20 xl:mt-60 lg:mt-40 xl:text-xl lg:text-sm font-serif xl:leading-8 lg:leading-5">
            Nilagdaan namin ang kasunduang ito ngayong ________, ng
            _____________ dito sa {contract?.tenant_id.apartment_id.address}, {contract?.tenant_id.apartment_id.barangay}, {contract?.tenant_id.apartment_id.province}
          </p>

          <p className="xl:mt-60 lg:mt-40 xl:text-2xl lg:text-xl font-bold font-serif">
            Petsa ng simula ng kontrata: {new Date()?.toLocaleDateString()}
          </p>
          <p className="xl:mt-10 lg:mt-5 xl:text-2xl lg:text-xl font-bold font-serif">
            Araw ng bayad: {new Date(contract?.tenant_id.monthly_due).getDate()} of the month
          </p>
          <div className="h-60 lg:h-60"></div>

          {contract?.witnesses >= 1 && <p className="xl:text-2xl lg:text-xlfont-serif font-bold underline">
            Mga saksi sa kasunduan
          </p>}
          {contract?.witnesses?.map((val, key) => (
            <p className="xl:mt-10 lg:mt-5 xl:text-2xl lg:text-xlfont-serif font-bold underline">
              1.)  {val.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeaseView
