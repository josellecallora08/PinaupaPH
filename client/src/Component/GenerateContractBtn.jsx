import React from 'react'
import {document_url} from '../utils/constants'
import { saveAs } from 'file-saver';
const GenerateContractBtn = ({unit_id = "65ac89873646a5d01f4c85f9", user_id = "65ac91dfb62eb0c3512b4832", owner_id = "65acd887ef36c0b39214095a"}) => {
    const createAndDownloadPdf = async () => {
        try {
          const response = await fetch(`${document_url}/${owner_id}/generate_contract`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              deposit: 200,
              advance: 600,
              user_id: user_id,
              unit_id: unit_id,
              from_date: "10-28-2001",
              to_date: "12-01-2024"
            }),
          });
          
          if (!response.ok) {
            throw new Error(`Failed to generate contract. Status: ${response.status}`);
          }
          const data = await response.json()
          // Only under this code is included for client side
          const pdfResponse = await fetch(`${document_url}/${unit_id}/${user_id}/fetch_contract`, { method: 'GET' });
      
          if (!pdfResponse.ok) {
            throw new Error(`Failed to fetch contract. Status: ${pdfResponse.status}`);
          }
          const pdfBlob = await pdfResponse.blob();
          saveAs(pdfBlob, `UNIT_${data.unit_no}_${data.name}_Contract Agreement.pdf`);
        } catch (error) {
          console.error('Error generating or fetching the PDF:', error.message);
        }
      };
  return (
    <button className='p-2 rounded-md shadow-xl bg-slate-200 hover:bg-blue/50' onClick={createAndDownloadPdf}>Download PDF</button>
  )
}

export default GenerateContractBtn