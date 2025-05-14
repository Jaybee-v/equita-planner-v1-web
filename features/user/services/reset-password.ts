"use server";
const resetPassword = async (params: {
  token: string;
  refreshToken: string;
  password: string;
}) => {
  const _response = await fetch(
    `${process.env.BACKEND_URL}/auth/reset-password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.token}`,
        Refresh: `Bearer ${params.refreshToken}`,
      },
      body: JSON.stringify({ password: params.password }),
    }
  );

  if (_response.status === 401) {
    const refreshResponse = await fetch(
      `${process.env.BACKEND_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.refreshToken}`,
        },
      }
    );
    const { token: newToken } = await refreshResponse.json();
    const response = await fetch(
      `${process.env.BACKEND_URL}/auth/reset-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
        body: JSON.stringify({ password: params.password }),
      }
    );
    return response.json();
  }

  return _response.json();
};

export default resetPassword;
