import React from "react";
import Link from "next/link";
import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const closeNav = () => setShowMenu(false);
  return (
    <nav className="py-2 px-6 bg-slate-900 h-16 flex items-center justify-between shadow-md sticky top-0 z-30  border-b border-slate-600">
      <div className="flex items-center">
        <Link href="/">
          <a className="text-xl md:text-2xl font-bold cursor-pointer mr-10">
            Cinematic
          </a>
        </Link>
        <ul
          className={`flex flex-col md:flex-row items-center md:gap-5 absolute bg-black left-0 top-0 h-screen w-full justify-center  z-30 transition-transform duration-700  md:translate-y-0 md:static md:bg-transparent md:h-fit ${
            showMenu ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <Link href="/movies?page=2">
            <a onClick={closeNav} className="navMenu">
              Movies
            </a>
          </Link>
          <Link href="/tv?page=1">
            <a onClick={closeNav} className="navMenu">
              Tv Show
            </a>
          </Link>
          {session && (
            <Link href="/list">
              <a onClick={closeNav} className="navMenu md:hidden">
                My list
              </a>
            </Link>
          )}

          {session && (
            <button
              onClick={() => {
                closeNav();
                signOut();
              }}
              className="navMenu md:hidden"
            >
              Logout
            </button>
          )}
          {!session && (
            <button
              onClick={() => {
                closeNav();
                signIn();
              }}
              className="navMenu md:hidden"
            >
              Login
            </button>
          )}
        </ul>
      </div>

      <div className="flex items-center gap-5">
        {session && (
          <Link href="/list">
            <a className="hidden md:inline-block font-medium hover:text-slate-300">
              My List
            </a>
          </Link>
        )}

        <div className="flex items-center gap-2 cursor-pointer md:border-l md:border-slate-700 pl-5">
          {session && (
            <span className="hidden md:inline-block text-sm opacity-80">
              {session.user.name}
            </span>
          )}
          <button
            className="md:hidden z-40"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? (
              <AiOutlineCloseCircle className="w-6 h-6" />
            ) : (
              <BiMenuAltRight className="w-6 h-6" />
            )}
          </button>
          {session && (
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={session.user.image} alt="" className="object-cover" />
            </div>
          )}
        </div>

        {session && (
          <button onClick={() => signOut()} className="navBtn bg-slate-800">
            Logout
          </button>
        )}
        {!session && (
          <button className="navBtn bg-sky-700" onClick={() => signIn()}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
