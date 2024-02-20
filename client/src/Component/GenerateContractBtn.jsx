import React from 'react'
import {document_url} from '../utils/constants'
import { saveAs } from 'file-saver';
const GenerateContractBtn = ({unit_id = "65af98bb963e98aa3b41b83c", user_id = "65afa2df213f589ebe1f37bc"}) => {
    const createAndDownloadPdf = async () => {
        try {
          // const response = await fetch(`${document_url}/generate_contract`, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     deposit: 200,
          //     advance: 600,
          //     user_id: user_id,
          //     unit_id: unit_id,
          //     from_date: "10-28-2001",
          //     to_date: "12-01-2024"
          //   }),
          // });
          
          // if (!response.ok) {
          //   throw new Error(`Failed to generate contract. Status: ${response.status}`);
          // }
          // const data = await response.json()
          // Only under this code is included for client side
          const pdfResponse = await fetch(`${document_url}/${unit_id}/${user_id}/fetch_contract`, { method: 'GET' });
      
          if (!pdfResponse.ok) {
            throw new Error(`Failed to fetch contract. Status: ${pdfResponse.status}`);
          }
          const pdfBlob = await pdfResponse.blob();
          saveAs(pdfBlob, `Lease Agreement.pdf`);
        } catch (error) {
          console.error('Error generating or fetching the PDF:', error.message);
        }
      };
  return (
    <button className='p-2 rounded-md shadow-xl bg-slate-200 hover:bg-blue/50' onClick={createAndDownloadPdf}>Download PDF</button>
  )
}

export default GenerateContractBtn