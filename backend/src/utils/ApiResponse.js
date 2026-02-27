class ApiResponse {
  constructor(statusCode, data = null, message = "Success") {
    this.statusCode = statusCode;
    this.success = true;
    this.data = data;
    this.message = message;
  }
}

export default ApiResponse;
