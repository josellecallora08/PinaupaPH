const httpStatusCodes = require('../constants/constants')
const TENANTMODEL = require('../models/tenant')
const USERMODEL = require('../models/user')
const CONTRACTMODEL = require('../models/contract')
const UNITMODEL = require('../models/unit')
const path = require('path')
const pdf = require('html-pdf')
const fs = require('fs').promises
const pdf_template = require('../template/contract')

module.exports.generate_contract = async (req, res) => {
  const { deposit, advance, user_id, unit_id, from_date, to_date } = req.body
  try {
    const user_response = await USERMODEL.findById(user_id)
    const unit_response = await UNITMODEL.findById(unit_id)

    if (!user_response || !unit_response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User or Unit Not found' })
    }

    const filePath = path.join(
      __dirname,
      '../documents/contracts',
      `Lease_Agreement_${unit_response.unit_no}-${user_response.name}.pdf`,
    )

    try {
      // Check if the file already exists
      await fs.access(filePath)
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Contract Exists' })
    } catch (error) {
      // File does not exist, proceed with generating the PDF
      const details = {
        name: user_response.name,
        deposit: deposit,
        advance: advance,
        unit_no: unit_response.unit_no,
        rent: unit_response.rent,
        from_date: from_date,
        to_date: to_date,
      }

      await new Promise((resolve, reject) => {
        pdf
          .create(pdf_template(details), {})
          .toFile(filePath, (err, result) => {
            if (err) reject(err)
            else resolve(result)
          })
      })

      const contractResponse = await CONTRACTMODEL.create({
        user_id,
        unit_id,
        advance,
        from_date,
        to_date,
      })
      if (!contractResponse)
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Contract Not found' })

      return res.status(httpStatusCodes.CREATED).json({
        message: 'Created Contract and Successfully saved to Database',
        name: details.name,
        unit_no: details.unit_no,
      })
    }
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error' })
  }
}

module.exports.generate_pdf = async (req, res) => {
  try {
    const { user_id, unit_id } = req.params
    const user_response = await USERMODEL.findById({ _id: user_id })
    if (!user_response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User Not found' })

    const unit_response = await UNITMODEL.findById({ _id: unit_id })
    if (!unit_response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Unit Not found' })

    const filePath = path.join(
      __dirname,
      '../documents/contracts',
      `Lease_Agreement_${unit_response.unit_no}-${user_response.name}.pdf`,
    )

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error sending PDF')
      }
    })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error' })
  }
}
module.exports.fetch_contract = async (req, res) => {
  try {
  } catch (err) {}
}

module.exports.edit_contract = async (req, res) => {
  const { contract_id } = req.params
  const { witness, witness2 } = req.body
  const details = {}

  if (!advance == '') {
    details.advance = advance
  }
  if (!witness == '') {
    details.from_date = witness
  }
  if (!witness2 == '') {
    details.to_date = witness2
  }

  try {
    const response = await CONTRACTMODEL.findByIdAndUpdate(
      { _id: contract_id },
      details,
    )
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to update contract' })

    await this.generate_contract()

    return res.status(httpStatusCodes.OK).json({ msg: 'Updated contract' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error' })
  }
}

module.exports.remove_contract = async (req, res) => {
  try {
    const { contract_id } = req.params
    const response = await CONTRACTMODEL.findByIdAndDelete({ _id: contract_id })
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to delete contract1' })

    const user_response = await TENANTMODEL.findOne({
      user_id: response.user_id,
    })
    if (!user_response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to delete contract2' })

    const unit_response = await UNITMODEL.findById({ _id: response.unit_id })
    if (!unit_response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Unit not found' })

    const pdf_file_path = `documents/contracts/Lease_Agreement_${unit_response.unit_no}-${user_response.user_id}.pdf`
    await fs.unlink(pdf_file_path)
    return res.status(httpStatusCodes.OK).json({ msg: 'Contract Deleted' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error' })
  }
}
