import Image from "next/image"

const Navbar = () => {
  return (
    <nav className="min-h-5 flex justify-between p-2">
        <div></div>
        <div>
            <Image src="/assets/Logo.png" alt="Logo" width={150} height={24} />
        </div>
        <div>
            .
        </div>
    </nav>
  )
}

export default Navbar