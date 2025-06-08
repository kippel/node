import Image from "next/image";

import { db } from "@/db/index"
import { testing } from '@/db/schema'

export default async function Home() {
  console.log(await db.query.testing.findMany())
  //await db.select().all()

  return (
    <div> 7 bar
    </div>
  );
}
