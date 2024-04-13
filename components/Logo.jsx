import Link from "next/link";
import Image from "next/image";
const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex py-4 px-4 mr-2">
        <Image
          src="/assets/icons/logo-white.png"
          width={150}
          height={200}
          alt="Logo"
        />
        <sup className="font-mono text-[10px]">Admin</sup>
      </Link>
    </div>
  );
};

export default Logo;
