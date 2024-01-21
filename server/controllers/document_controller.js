const httpStatusCodes = require('../constants/constants');
const TENANTMODEL = require('../models/tenant');
const USERMODEL = require('../models/user');
const CONTRACTMODEL = require('../models/contract');
const UNITMODEL = require('../models/unit');
const path = require('path');
const pdf = require('html-pdf');
const pdf_template = require('../documents');

module.exports.generate_contract = async (req, res) => {
    try {
        const { user_id, unit_id } = req.params;
        const { deposit, advance } = req.body;

        const user_response = await USERMODEL.findById({ _id: user_id });
        if (!user_response) {
            return res.status(httpStatusCodes.NOT_FOUND).json({ error: "User Not found" });
        }

        const unit_response = await UNITMODEL.findById({ _id: unit_id });
        if (!unit_response) {
            return res.status(httpStatusCodes.NOT_FOUND).json({ error: "Unit Not found" });
        }

        const details = {
            "name": user_response.name,
            "deposit": deposit,
            "advance": advance,
            "unit_no": unit_response.unit_no,
            "rent": unit_response.rent
        };

        await new Promise((resolve, reject) => {
            pdf.create(pdf_template(details), {}).toFile(`contracts/${details.unit_no}-${details.name}.pdf`, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        const response = await CONTRACTMODEL.create({ unit_id});
        if (!response) {
            return res.status(httpStatusCodes.NOT_FOUND).json({ error: "Contract Not found" });
        }

        return res.status(httpStatusCodes.CREATED).json({ message: "Created Contract and Successfully saved to Database" });
    } catch (err) {
        console.error({ error: err.message });
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server Error" });
    }
};

module.exports.fetch_contract = async (req, res) => {
    try{
        const { user_id, unit_id } = req.params;
    const user_response = await USERMODEL.findById({ _id: user_id });
    if (!user_response) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ error: "User Not found" });
    }

    const unit_response = await UNITMODEL.findById({ _id: unit_id });
    if (!unit_response) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ error: "Unit Not found" });
    }
    const filePath = path.join(__dirname, '../contracts', `${unit_response.unit_no}-${user_response.name}.pdf`);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error sending PDF');
        }
    });
    }
    catch(err){
        console.error({ error: err.message });
        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server Error" });
    }
};
