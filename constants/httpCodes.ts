/**
 * We should not use to much different error codes
 * Here are the allowed ones
 */

export enum EHTTPSuccessCode {
  CODE_200 = 200, // OK -- Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action.
  CODE_201 = 201, // Created -- The request has been fulfilled, resulting in the creation of a new resource.
}

export enum EHTTPRedirectCode {
  CODE_301 = 301, // Moved Permanently -- This and all future requests should be directed to the given URI.
  CODE_302 = 302, // Found (Previously "Moved temporarily") -- Tells the client to look at (browse to) another URL. 302 has been superseded by 303 and 307. This is an example of industry practice contradicting the standard. The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect (the original describing phrase was "Moved Temporarily"),
}

export enum EHTTPErrorCode {
  CODE_400 = 400, // Bad Request -- The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).
  CODE_401 = 401, // Unauthorized -- Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.
  CODE_403 = 403, // Forbidden -- The request contained valid data and was understood by the server, but the server is refusing action.
  CODE_404 = 404, // Not Found -- The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
  CODE_405 = 405, // Method Not Allowed -- A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
  CODE_413 = 413, // Request Entity Too Large -- The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".
  CODE_429 = 429, // Too Many Requests -- The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.

  CODE_500 = 500, // Internal Server Error -- A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
  CODE_501 = 501, // Not Implemented -- The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API).
  CODE_503 = 503, // Service Unavailable -- The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state.
  CODE_504 = 504, // Gateway Time-out -- The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
}
