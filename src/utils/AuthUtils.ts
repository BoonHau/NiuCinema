// Function thats validate user email and password
export const getUserLoginValidation = (
  username?: string,
  password?: string,
): {success: boolean; message: string | undefined} => {
  let success: boolean = true;
  let message: string = '';

  // Check whether username or password is empty
  if (!username || !password) {
    success = success && false;
    message = `${message + '\n'}• Username and password could not be empty.`;
  } else {
    // Check whether password is less than 7 characteres
    if (password.length < 6) {
      success = success && false;
      message = `${message + '\n'}• Password must be at least 7 characters.`;
    }
    // Check whether password is more than 15 characteres
    if (password.length > 15) {
      success = success && false;
      message = `${
        message + '\n'
      }• Password could not be more than 15 characters.`;
    }
    // // Check whether password has at least 1 numeral
    // if (password.search(/[a-zA-Z]+/) == -1 || password.search(/[0-9]+/) == -1) {
    //   success = success && false;
    //   message = `${message + '\n'}• Password must contain at least 1 numeral.`;
    // }
  }

  return {success, message};
};
