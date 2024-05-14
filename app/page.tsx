import { getCategory } from "@/services/lib/category";
import Image from "next/image";
export const runtime = 'edge';

export const dynamic = 'force-dynamic'

export default async function Home() {
  let data = await getCategory({offset:0,limit:10});
  console.log(data);
  return (
    <main>{data}</main>
  );
}
