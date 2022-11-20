const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            datas: data
        },
        mesage: message,
        pagination: {
            prev: "",
            next: "",
            max: "",
        }
    })
}
module.exports = response