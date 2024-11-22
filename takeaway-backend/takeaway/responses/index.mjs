export function sendResponse(status, data) {
    return {
        statusCode: status,
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    };
}

export const sendResponseWithHeaders = (statusCode, body, token) => {    
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
        },
        body: JSON.stringify({
            data: body,
            token : token
        }),
    };
};

export function sendError(status, data) {
    return {
        statusCode: status,
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    };
}

// Författare: Niklas, Rindert, Jonas
// Responses

//Niklas
//Lagt till sendResponseWithHeaders
