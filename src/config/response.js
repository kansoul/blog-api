// response.js

const response200 = {
  success: true,
  code: 200,
  message: "Request successful",
};

const response400 = {
  error: true,
  code: 400,
  message: "Bad Request",
  type: "ClientErrorException",
};

const response401 = {
  error: true,
  code: 401,
  message: "Unauthenticated",
  type: "AuthenticationException",
};

const response403 = {
  error: true,
  code: 403,
  message: "Forbidden",
  type: "AuthorizationException",
};

const response404 = {
  error: true,
  code: 404,
  message: "Not Found",
  type: "NotFoundException",
};

const response405 = {
  error: true,
  code: 405,
  message: "Method Not Allowed",
  type: "MethodNotAllowedException",
};

const response500 = {
  error: true,
  code: 500,
  message: "Internal Server Error",
  type: "InternalServerErrorException",
};

module.exports = {
  response200,
  response400,
  response401,
  response403,
  response404,
  response405,
  response500,
};
