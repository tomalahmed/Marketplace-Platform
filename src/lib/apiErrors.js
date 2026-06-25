export function getApiErrorMessage(error, fallback = "Something went wrong.") {
  if (error?.isNetworkError || !error?.response) {
    return "Cannot reach the API server. Start Marketplace-Platform-Server (npm run dev) and ensure MongoDB Atlas allows your IP.";
  }

  return error?.response?.data?.message || error?.message || fallback;
}
