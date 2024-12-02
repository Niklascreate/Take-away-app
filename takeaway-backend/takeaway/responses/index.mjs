


const cspHeader = "default-src 'self'; script-src 'self' https://trusted.cdn.com; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; object-src 'none'; img-src 'self' https://trusted.images.com https://herringimgbucket.s3.eu-north-1.amazonaws.com;";


export function sendResponse(status, data) {
    return {
        statusCode: status,
        headers : {
            'Content-Type' : 'application/json',
            'Content-Security-Policy' : cspHeader,
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
            'Content-Security-Policy' : cspHeader,
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
// Responses.

//Niklas
//Lagt till sendResponseWithHeaders och csp.
