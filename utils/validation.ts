export const isValidEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const phoneNumberPattern = /^(09\d{7,9})$/;

export const isValidPhoneNumber = (phoneNumber: string) => {
  return phoneNumberPattern.test(phoneNumber);
};
