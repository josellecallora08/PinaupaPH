import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className='w-full h-full overflow-y-auto bg-white1'>
      <div className='w-11/12 h-full m-auto '>
      <div className="mx-auto py-8 px-4 text-primary-color h-full p-5">
          <h1 className="text-3xl font-bold mb-4">Terms and Conditions for PinaupaPH <span className=''></span></h1>
          <div className="prose">
            <h2 className="text-base font-semibold mb-2">1. Introduction</h2>
            <p className="mb-4">Welcome to our Apartment Management System. If you continue to use this system, you are agreeing to comply with and be bound by the following terms and conditions of use, which govern our relationship with you in relation to this system. The use of this system is subject to the following terms of use:</p>

            <h2 className="text-base font-semibold mb-2">2. Access to the System</h2>
            <p className="mb-4">You must be a registered user to access the features of this system. By registering for an account and using this system, you agree to provide accurate and complete information and to keep your account credentials secure.</p>

            <h2 className="text-base font-semibold mb-2">3. User Responsibilities</h2>
            <p className="mb-4">Users of this system are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users must not share their account credentials with others and must promptly notify the system administrator of any unauthorized use of their account.</p>

            <h2 className="text-base font-semibold mb-2">4. Usage Restrictions</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Sharing login credentials with unauthorized individuals.</li>
              <li>Attempting to gain unauthorized access to the system or its related systems or networks.</li>
              <li>Interfering with the proper functioning of the system or its security features.</li>
              <li>Using the system for any unlawful purpose or in violation of any applicable laws or regulations.</li>
            </ul>

            <h2 className="text-base font-semibold mb-2">5. Data Privacy</h2>
            <p className="mb-4">We are committed to protecting the privacy of your personal information. By using this system, you agree to the collection, use, and disclosure of your information as described in our Privacy Policy.</p>

            <h2 className="text-base font-semibold mb-2">6. Disclaimer of Warranties</h2>
            <p className="mb-4">This system is provided "as is," without any warranties of any kind. We make no representations or warranties of any kind, express or implied, regarding the operation of this system or the information, content, materials, or products included on this system.</p>

            <h2 className="text-base font-semibold mb-2">7. Limitation of Liability</h2>
            <p className="mb-4">We shall not be liable for any damages arising from the use of this system or inability to use this system, including but not limited to direct, indirect, incidental, consequential, or punitive damages.</p>

            <h2 className="text-base font-semibold mb-2">8. Changes to Terms and Conditions</h2>
            <p className="mb-4">We reserve the right to modify these terms and conditions at any time. Your continued use of the system following any changes constitutes acceptance of those changes.</p>

            <h2 className="text-base font-semibold mb-2">9. Governing Law</h2>
            <p className="mb-4">These terms and conditions are governed by and construed in accordance with the laws of [Your Country/State], and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
