import React from 'react'
import {document_url} from '../utils/constants'
import { saveAs } from 'file-saver';
const GenerateContractBtn = ({unit_id, user_id}) => {
    const createAndDownloadPdf = async () => {
        try {
          const response = await fetch(`${document_url}/${unit_id}/${user_id}/generate_contract`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              deposit: 200,
              advance: 600,
            }),
          });
      
          if (!response.ok) {
            throw new Error(`Failed to generate contract. Status: ${response.status}`);
          }
      
          const pdfResponse = await fetch(`${document_url}/${unit_id}/${user_id}/fetch_contract`, { method: 'GET' });
      
          if (!pdfResponse.ok) {
            throw new Error(`Failed to fetch contract. Status: ${pdfResponse.status}`);
          }
      
          const pdfBlob = await pdfResponse.blob();
          saveAs(pdfBlob, 'newPdf.pdf');
        } catch (error) {
          console.error('Error generating or fetching the PDF:', error.message);
        }
      };
  return (
    <button onClick={createAndDownloadPdf}>Download PDF</button>
  )
}

export default GenerateContractBtn