// import React, { useState } from 'react';
// import { createBeneficiary } from '../apiService';
// import { useNavigate } from 'react-router-dom';
// import './CreateBeneficiary.css'

// const CreateBeneficiary = () => {
//     const [formData, setFormData] = useState({
//         address: {
//             city: '',
//             country_code: '',
//             postcode: '',
//             street_address: '',
//         },
//         iban: '',
//         account_number: '',
//         entity_type: 'COMPANY', // Default value
//         transfer_method: 'LOCAL', // Default value
//     });

//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigate = useNavigate();

//     const handleInputChange = (e, field, subField) => {
//         if (subField) {
//             setFormData({
//                 ...formData,
//                 [field]: {
//                     ...formData[field],
//                     [subField]: e.target.value,
//                 },
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [field]: e.target.value,
//             });
//         }
//     };

//     const generateRequestData = () => {
//         return {
//             beneficiary: {
//                 address: {
//                     country_code: formData.address.country_code || 'US',
//                     postcode: formData.address.postcode || '1582',
//                     street_address: formData.address.street_address || 'NYC',
//                     city: formData.address.city || 'NYC',
//                     state: formData.address.city || 'NYC', // Static mapping
//                 },
//                 bank_details: {
//                     bank_country_code: 'US',
//                     account_currency: 'USD',
//                     iban: formData.iban || 'BG61UBBS81551016016805',
//                     account_name: 'BG TEX NOVA LTD', // Static value
//                     account_routing_type1: 'aba',
//                     account_routing_value1: '021000021',
//                     account_number: formData.account_number || '1234567890',
//                 },
//                 company_name: 'BG TEX NOVA Ltd.', // Static value
//                 entity_type: formData.entity_type,
//             },
//             transfer_methods: [formData.transfer_method],
//             nickname: '2540_4121212', // Static value
//         };
//     };


//     const handleSubmit = async () => {
//         const beneficiaryData = {
//             beneficiary: {
//                 address: {
//                     country_code: formData.address.country_code || 'US',
//                     postcode: formData.address.postcode || '90210',
//                     street_address: formData.address.street_address || 'Avenue Road',
//                     city: formData.address.city || 'NYC',
//                     state: formData.address.city || 'US-AK', // Static mapping
//                 },
//                 bank_details: {
//                     bank_country_code: 'US',
//                     account_currency: 'USD',
//                     iban: formData.iban || 'BG61UBBS81551016016805',
//                     account_name: 'BG TEX NOVA LTD', // Static value
//                     account_routing_type1: 'aba',
//                     account_routing_value1: '021000021',
//                     account_number: formData.account_number || '1234567890',
//                 },
//                 company_name: 'BG TEX NOVA Ltd.', // Static value
//                 entity_type: formData.entity_type,
//             },
//             transfer_methods: [formData.transfer_method],
//             nickname: '2540_4121212', // Static value
//         };

//         console.log(JSON.stringify(beneficiaryData, null, 2)); // Log the payload


//         try {
//             const response = await createBeneficiary(beneficiaryData);
//             setSuccessMessage('Beneficiary created successfully!');
//             console.log('Success Message:', successMessage);
//             setTimeout(() => {
//                 navigate('/retrieve-beneficiaries'); // Navigate to beneficiaries list
//             }, 5000); // Wait 5 seconds before navigating
//         } catch (error) {
//             console.error('Error creating beneficiary:', error.response?.data || error.message);
//             setErrorMessage(error.response?.data?.message || 'Failed to create beneficiary. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h2>Create Beneficiary</h2>
//             <div>
//                 {successMessage && <p style={{ color: 'green', fontSize: '16px' }}>{successMessage}</p>}
//             </div>            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//             <form>
//                 <div>
//                     <label>City:</label>
//                     <input
//                         type="text"
//                         value={formData.address.city}
//                         onChange={(e) => handleInputChange(e, 'address', 'city')}
//                     />
//                 </div>
//                 <div>
//                     <label>Country (ISO 2 Code):</label>
//                     <input
//                         type="text"
//                         value={formData.address.country_code}
//                         onChange={(e) => handleInputChange(e, 'address', 'country_code')}
//                     />
//                 </div>
//                 <div>
//                     <label>Postcode:</label>
//                     <input
//                         type="text"
//                         value={formData.address.postcode}
//                         onChange={(e) => handleInputChange(e, 'address', 'postcode')}
//                     />
//                 </div>
//                 <div>
//                     <label>Street Address:</label>
//                     <input
//                         type="text"
//                         value={formData.address.street_address}
//                         onChange={(e) => handleInputChange(e, 'address', 'street_address')}
//                     />
//                 </div>
//                 <div>
//                     <label>IBAN:</label>
//                     <input
//                         type="text"
//                         value={formData.iban}
//                         onChange={(e) => handleInputChange(e, 'iban')}
//                     />
//                 </div>
//                 <div>
//                     <label>Account Number:</label>
//                     <input
//                         type="text"
//                         value={formData.account_number}
//                         onChange={(e) => handleInputChange(e, 'account_number')}
//                     />
//                 </div>
//                 <div>
//                     <label>Entity Type:</label>
//                     <select
//                         value={formData.entity_type}
//                         onChange={(e) => handleInputChange(e, 'entity_type')}
//                     >
//                         <option value="COMPANY">COMPANY</option>
//                         <option value="PERSONAL">PERSONAL</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label>Transfer Method:</label>
//                     <select
//                         value={formData.transfer_method}
//                         onChange={(e) => handleInputChange(e, 'transfer_method')}
//                     >
//                         <option value="LOCAL">LOCAL</option>
//                         <option value="SWIFT">SWIFT</option>
//                     </select>
//                 </div>
//                 <div className="json-preview">
//                     <h3>JSON Preview</h3>
//                     <pre>{JSON.stringify(generateRequestData(), null, 2)}</pre>
//                 </div>
//                 <button type="button" onClick={handleSubmit}>
//                     Create Beneficiary
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateBeneficiary;

import React, { useState } from 'react';
import { createBeneficiary } from '../apiService';
import { useNavigate } from 'react-router-dom';
import './CreateBeneficiary.css';

const CreateBeneficiary = () => {
    const [formData, setFormData] = useState({
        address: {
            city: '',
            country_code: '',
            postcode: '',
            street_address: '',
        },
        bank_details: {
            iban: '',
            account_currency: 'EUR', // Default value
            account_name: '',
            bank_country_code: 'IE', // Default value
        },
        first_name: '',
        last_name: '',
        entity_type: 'PERSONAL', // Default value
        transfer_methods: ['SWIFT'], // Default value
        nickname: '2540_4121212', // Default value
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e, field, subField) => {
        if (subField) {
            setFormData({
                ...formData,
                [field]: {
                    ...formData[field],
                    [subField]: e.target.value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [field]: e.target.value,
            });
        }
    };

    const handleSubmit = async () => {
        const beneficiaryData = {
            beneficiary: {
                address: {
                    city: formData.address.city,
                    country_code: formData.address.country_code,
                    postcode: formData.address.postcode,
                    street_address: formData.address.street_address,
                },
                bank_details: {
                    account_currency: formData.bank_details.account_currency,
                    account_name: formData.bank_details.account_name,
                    bank_country_code: formData.bank_details.bank_country_code,
                    iban: formData.bank_details.iban,
                },
                first_name: formData.first_name,
                last_name: formData.last_name,
                company_name: 'BG TEX NOVA Ltd.', // Static value
                entity_type: formData.entity_type,
            },
            transfer_methods: formData.transfer_methods,
            nickname: formData.nickname,
        };

        try {
            await createBeneficiary(beneficiaryData);
            setSuccessMessage('Beneficiary created successfully!');
            setTimeout(() => {
                navigate('/retrieve-beneficiaries'); // Navigate to beneficiaries list
            }, 5000);
        } catch (error) {
            console.error('Error creating beneficiary:', error.response?.data || error.message);
            setErrorMessage(error.response?.data?.message || 'Failed to create beneficiary. Please try again.');
        }
    };

    return (
        <div className="beneficiary-form-container">
            <h2 className="beneficiary-form-header">Create Beneficiary</h2>
            {successMessage && <p className="beneficiary-form-success">{successMessage}</p>}
            {errorMessage && <p className="beneficiary-form-error">{errorMessage}</p>}
            <form className="beneficiary-form">
                {/* Address Fields */}
                <div className="beneficiary-form-group">
                    <label>City:</label>
                    <input
                        type="text"
                        value={formData.address.city}
                        onChange={(e) => handleInputChange(e, 'address', 'city')}
                    />
                </div>
                <div className="beneficiary-form-group">
                    <label>Country Code (ISO):</label>
                    <input
                        type="text"
                        value={formData.address.country_code}
                        onChange={(e) => handleInputChange(e, 'address', 'country_code')}
                    />
                </div>
                <div className="beneficiary-form-group">
                    <label>Postcode:</label>
                    <input
                        type="text"
                        value={formData.address.postcode}
                        onChange={(e) => handleInputChange(e, 'address', 'postcode')}
                    />
                </div>
                <div className="beneficiary-form-group">
                    <label>Street Address:</label>
                    <input
                        type="text"
                        value={formData.address.street_address}
                        onChange={(e) => handleInputChange(e, 'address', 'street_address')}
                    />
                </div>

                {/* Bank Details Fields */}
                <div className="beneficiary-form-group">
                    <label>IBAN:</label>
                    <input
                        type="text"
                        value={formData.bank_details.iban}
                        onChange={(e) => handleInputChange(e, 'bank_details', 'iban')}
                    />
                </div>
                <div className="beneficiary-form-group">
                    <label>Account Name:</label>
                    <input
                        type="text"
                        value={formData.bank_details.account_name}
                        onChange={(e) => handleInputChange(e, 'bank_details', 'account_name')}
                    />
                </div>

                {/* Personal Info Fields */}
                <div className="beneficiary-form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => handleInputChange(e, 'first_name')}
                    />
                </div>
                <div className="beneficiary-form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => handleInputChange(e, 'last_name')}
                    />
                </div>

                {/* Entity Type and Transfer Methods */}
                <div className="beneficiary-form-group">
                    <label>Entity Type:</label>
                    <select
                        value={formData.entity_type}
                        onChange={(e) => handleInputChange(e, 'entity_type')}
                    >
                        <option value="PERSONAL">PERSONAL</option>
                        <option value="COMPANY">COMPANY</option>
                    </select>
                </div>

                <button type="button" className="beneficiary-form-submit" onClick={handleSubmit}>
                    Create Beneficiary
                </button>
            </form>
        </div>
    );
};

export default CreateBeneficiary;
