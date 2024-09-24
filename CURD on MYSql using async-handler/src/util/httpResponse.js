
module.exports = (res, responseStatusCode, responseMessage, data = null) => {
    const response = {
        success: responseStatusCode >= 200 && responseStatusCode < 300,
        statusCode: responseStatusCode,
        message: responseMessage,
        data: data
    };
    res.status(responseStatusCode).json(response);
};



