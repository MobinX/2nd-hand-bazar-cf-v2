

export const getURL = async () => {  
if (typeof window === "undefined") {
  const headers = await import("next/headers").then((mod) => mod.headers);
  const urlHeaderValue = headers().get("x-url");
  return new URL(urlHeaderValue || "");
}
return new URL(window.location.href);
}