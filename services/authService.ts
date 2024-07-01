import { authHost, lifeSessionTimeInMin } from "../constants/auth.constants";

async function authService(email, password) {
  try {
    const response = await fetch(`${authHost}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        expiresInMins: lifeSessionTimeInMin,
      }),
    });

    console.log("Response status: ", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error data: ", errorData);
      throw new Error(errorData.message || 'Error de autenticación');
    }

    const userData = await response.json();
    console.log("User data: ", userData);
    return userData;
  } catch (error) {
    console.log("Error: ", error.message);
    alert(error.message);
    return undefined;
  }
}

export default authService;

