import { getCategory } from "@/services/lib/category";
import Image from "next/image";
export const runtime = 'edge';
export default async function Home() {
  let data = await getCategory({id:3,offset:0,limit:10});
  console.log(data);
  return (
    <main></main>
  );
}
