import {headers} from "next/headers";

export const getURL = () => {  

  const urlHeaderValue = headers().get("x-url");
  return new URL(urlHeaderValue || "");

}