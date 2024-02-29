export const isValidEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const phoneNumberPattern = /^(09\d{7,9})$/;

export const isValidPhoneNumber = (phoneNumber: string) => {
  return phoneNumberPattern.test(phoneNumber);
};

export const handleEnter = async (
  event: React.KeyboardEvent<HTMLInputElement>,
  fetchMethod: () => void
) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    // Fetch data using query
    try {
      fetchMethod();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};
