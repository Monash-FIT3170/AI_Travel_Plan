/**
 * An arrow function that is used in a get request
 */
const getExampleRequest = (req, res) => {
    res.status(200).json({message: 'I live in the server'})
}

module.exports = {
    getExampleRequest,
}