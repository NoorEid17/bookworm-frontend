import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="min-h-5 flex justify-between p-2">
      <div></div>
      <div>
        <Link href="/">
          <Image src="/assets/Logo.png" alt="Logo" width={150} height={24} />
        </Link>
      </div>
      <div>.</div>
    </nav>
  );
};

export default Navbar;
