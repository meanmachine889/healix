import Form from "@/components/form";
import { Atom } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col h-[100vh] justify-start py-9 gap-[2rem] items-center font-[family-name:var(--font-poppins)]">
      <div className="flex justify-between w-[100%] md:w-[80%] px-5">
        <div className="text-3xl font-medium flex gap-4 items-center">
          <Atom size={26} />
          healix
        </div>
      </div>
      <div className="flex p-7 py-6 flex-col items-center gap-7 justify-start md:w-[80%]">
        <Form />
      </div>
    </div>
  );
}
