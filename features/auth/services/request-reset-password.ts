"use server";
const requestResetPassword = async (email: string) => {
  console.log(email);
  const response = await fetch(
    process.env.BACKEND_URL + "/auth/request-reset-password",
    {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    return { success: false };
  }
  return {
    success: true,
  };
};

export default requestResetPassword;
