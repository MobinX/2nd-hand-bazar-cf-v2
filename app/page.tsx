import Image from "next/image";
import { getURL } from "@/services/getUrl";
export const runtime = 'edge';
export default async function Home() {
  return (
    <main>{(await getURL()).href}</main>
  );
}
