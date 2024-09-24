
module.exports  = (res, responseStatusCode, responseMessage) => {
    const response = {
        success: false,  
        statusCode: responseStatusCode,
        message: responseMessage,
    };

    res.status(responseStatusCode).json(response);
};




