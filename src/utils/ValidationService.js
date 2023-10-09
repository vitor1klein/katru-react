// validationService.js

export function validateEmail(email) {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return emailPattern.test(email);
}

export function validateNumericInput(input) {
  const numericPattern = /^[0-9]+$/;

  return numericPattern.test(input);
}
