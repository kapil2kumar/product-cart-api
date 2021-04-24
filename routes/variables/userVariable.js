// Create a json scehma
exports.loginWebSchema = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        required: true,
        minLength: 5,
        maxLength: 50
      },
      password: {
        type: 'string',
        required: true,
        minLength: 7,
        maxLength: 50
      }
    }
  };
  