import Image from "next/image";
import { Inter } from "next/font/google";
import Tags from "@/components/Tags";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container mx-auto mt-8">
      <Tags />
    </div>
  );
}
