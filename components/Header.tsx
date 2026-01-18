import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#333333] text-white p-4 flex justify-between items-center z-40 top-0 left-0 right-0 sticky">
      <div className="flex items-center gap-4 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold">Track</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-[#FFD700]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/users" className="hover:text-[#FFD700]">
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
