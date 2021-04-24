// Create a json scehma
exports.productCartSchema = {
    type: 'object',
    properties: {
      product_id: {
        type: 'integer',
        required: true,
        minimum: 1
      }
    }
  };
  