class FormValidationManager {
  static extractError(error) {
    if (error) {
      switch (error.type) {
        case "required":
          return "Field is required";
        case "notMatch":
          return "Fields do not match";
        default:
          return error.message;
      }
    }
  }
}
export default FormValidationManager;
