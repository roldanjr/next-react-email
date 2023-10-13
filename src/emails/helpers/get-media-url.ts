export const getMediaUrl = (path: string) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.VERCEL_URL
      : "http://localhost:3000";

  return `${baseUrl}${path}`;
};
