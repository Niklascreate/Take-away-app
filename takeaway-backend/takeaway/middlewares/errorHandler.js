const { sendResponse } = require("../responses");

exports.handler = () => ({
  onError: (handler) => {
    handler.response = sendResponse(404, { message: handler.error.message });
  }
});