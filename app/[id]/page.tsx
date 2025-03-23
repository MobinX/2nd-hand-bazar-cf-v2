import { getCategory } from "@/services/lib/category";
import Image from "next/image";
export const runtime = 'edge';
export default async function Home() {
  let data = await getCategory({id:573,offset:0,limit:10000});
  console.log(data);
  return (
    <main>hi</main>
  );
}
