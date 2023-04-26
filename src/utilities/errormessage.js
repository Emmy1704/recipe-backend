function formatZodError(errors) {
   return errors.map((error) => error.path.join(".").concat(": ", error.message));
}

module.exports = {
   formatZodError
}