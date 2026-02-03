import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src={"/vercel.svg"} alt="Logo" width={48} height={48} />
    </div>
  );
}
