"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Skiper3() {
  const pathname = usePathname();

  const { data: session, status } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const authRef = useRef<HTMLDivElement>(null);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Species",
      href: "/species",
    },
    {
      name: "Analytics",
      href: "/analytics",
    },
    {
      name: "Team",
      href: "/team",
    },
    {
    name: "Get Connected",
    href: "/get-connected",
  },
  {
    name: "Report poaching",
    href: "/report-poaching",
  },
];

  /* 
     CLOSE AUTH MENU WHEN CLICKING OUTSIDE
   */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        authRef.current &&
        !authRef.current.contains(event.target as Node)
      ) {
        setAuthOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* 
     CLOSE MOBILE MENU ON ROUTE CHANGE
   */

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* 
     GOOGLE LOGIN
   */

  async function handleGoogleLogin() {
    try {
      await signIn("google", {
        callbackUrl: pathname || "/",
      });
    } catch (error) {
      console.error("Google login error:", error);
    }
  }

  /* 
     LOGOUT
   */

  async function handleLogout() {
    try {
      await signOut({
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <>
      {/* 
          NAVBAR
       */}

      <nav
        className="
          fixed
          left-0
          top-0
          z-[100]
          h-16
          w-full
          border-b
          border-slate-200
          bg-white/95
          backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto
            flex
            h-full
            w-full
            max-w-[1600px]
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* 
              LEFT
           */}

          <div className="flex items-center gap-4">
            {/* LOGO */}

            <Link
              href="/"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-slate-200
                bg-slate-100
              "
            >
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.ZnbT4w9lgf3InLAvYg7VZgHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Wildlife logo"
                className="h-full w-full object-cover"
              />
            </Link>

            {/* DESKTOP NAVIGATION */}

            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => {
                const active =
                  pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      relative
                      py-2
                      text-sm
                      font-medium
                      transition-colors
                      ${
                        active
                          ? "text-slate-950"
                          : "text-slate-500 hover:text-slate-950"
                      }
                    `}
                  >
                    {item.name}

                    {active && (
                      <motion.span
                        layoutId="active-nav"
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-[2px]
                          w-full
                          rounded-full
                          bg-slate-950
                        "
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 
              RIGHT SIDE
           */}

          <div className="flex items-center gap-2 sm:gap-3">
            {/* SEARCH */}

            <div className="relative">
              <motion.div
                animate={{
                  width: searchOpen ? 190 : 40,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  flex
                  h-9
                  items-center
                  overflow-hidden
                  rounded-full
                  border
                  border-slate-200
                  bg-slate-50
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setSearchOpen(!searchOpen)
                  }
                  className="
                    flex
                    h-9
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    text-slate-500
                    transition
                    hover:text-slate-900
                  "
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                    />

                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </button>

                {searchOpen && (
                  <input
                    type="text"
                    placeholder="Search..."
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      pr-3
                      text-sm
                      text-slate-800
                      outline-none
                      placeholder:text-slate-400
                    "
                  />
                )}
              </motion.div>
            </div>

            {/* 
                AUTH BUTTON
             */}

            <div
              ref={authRef}
              className="relative"
            >
              {/* LOGGED OUT */}

              {status !== "authenticated" && (
                <button
                  type="button"
                  onClick={() =>
                    setAuthOpen(!authOpen)
                  }
                  className="
                    flex
                    h-9
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-slate-200
                    bg-slate-100
                    px-3
                    text-xs
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-slate-200
                    sm:px-4
                    sm:text-sm
                  "
                >
                  <span className="hidden sm:inline">
                    Sign In
                  </span>

                  <span className="sm:hidden">
                    Sign
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              )}

              {/* LOGGED IN */}

              {status === "authenticated" && (
                <button
                  type="button"
                  onClick={() =>
                    setAuthOpen(!authOpen)
                  }
                  className="
                    flex
                    h-9
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-slate-200
                    bg-slate-50
                    px-2
                    transition
                    hover:bg-slate-100
                  "
                >
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={
                        session.user.name ||
                        "User"
                      }
                      className="
                        h-7
                        w-7
                        rounded-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-slate-800
                        text-xs
                        font-bold
                        text-white
                      "
                    >
                      {session?.user?.name
                        ?.charAt(0)
                        .toUpperCase() || "U"}
                    </div>
                  )}

                  <span
                    className="
                      hidden
                      max-w-[100px]
                      truncate
                      text-xs
                      font-semibold
                      text-slate-700
                      sm:block
                    "
                  >
                    {session?.user?.name ||
                      "User"}
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              )}

              {/* 
                  AUTH DROPDOWN
               */}

              <AnimatePresence>
                {authOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                    className="
                      absolute
                      right-0
                      top-12
                      w-64
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-2
                      shadow-xl
                    "
                  >
                    {/* NOT LOGGED IN */}

                    {status !== "authenticated" && (
                      <div className="p-2">
                        <div className="mb-3 px-2">
                          <p className="text-sm font-semibold text-slate-900">
                            Welcome
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            Sign in to access your
                            account.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={
                            handleGoogleLogin
                          }
                          className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-slate-700
                            shadow-sm
                            transition
                            hover:bg-slate-50
                          "
                        >
                          {/* GOOGLE ICON */}

                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#4285F4"
                              d="M21.35 12.27c0-.68-.06-1.34-.18-1.97H12v3.73h5.24a4.48 4.48 0 01-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.15z"
                            />

                            <path
                              fill="#34A853"
                              d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.55 0-4.71-1.72-5.49-4.04H3.26v2.53A9.74 9.74 0 0012 21.7z"
                            />

                            <path
                              fill="#FBBC05"
                              d="M6.51 13.78a5.86 5.86 0 010-3.56V7.69H3.26a9.73 9.73 0 000 8.62l3.25-2.53z"
                            />

                            <path
                              fill="#EA4335"
                              d="M12 6.18c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.27 14.63 2.3 12 2.3a9.74 9.74 0 00-8.74 5.39l3.25 2.53C7.29 7.9 9.45 6.18 12 6.18z"
                            />
                          </svg>

                          Continue with Google
                        </button>
                      </div>
                    )}

                    {/* LOGGED IN */}

                    {status === "authenticated" && (
                      <div className="p-2">
                        <div className="mb-2 rounded-xl bg-slate-50 p-3">
                          <div className="flex items-center gap-3">
                            {session?.user
                              ?.image ? (
                              <img
                                src={
                                  session.user
                                    .image
                                }
                                alt={
                                  session.user
                                    .name ||
                                  "User"
                                }
                                className="
                                  h-10
                                  w-10
                                  rounded-full
                                  object-cover
                                "
                              />
                            ) : (
                              <div
                                className="
                                  flex
                                  h-10
                                  w-10
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-slate-800
                                  font-bold
                                  text-white
                                "
                              >
                                {session?.user?.name
                                  ?.charAt(0)
                                  .toUpperCase() ||
                                  "U"}
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-slate-900">
                                {session?.user
                                  ?.name ||
                                  "User"}
                              </p>

                              <p className="truncate text-xs text-slate-500">
                                {session?.user
                                  ?.email || ""}
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={
                            handleLogout
                          }
                          className="
                            flex
                            w-full
                            items-center
                            justify-center
                            rounded-xl
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-red-600
                            transition
                            hover:bg-red-50
                          "
                        >
                          Log Out
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 
                MOBILE MENU BUTTON
             */}

            <button
              type="button"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-slate-50
                text-slate-700
                md:hidden
              "
              aria-label="Open menu"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 
            MOBILE NAVIGATION
         */}

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="
                overflow-hidden
                border-b
                border-slate-200
                bg-white
                md:hidden
              "
            >
              <div className="space-y-1 p-4">
                {navItems.map((item) => {
                  const active =
                    pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={`
                        block
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        transition
                        ${
                          active
                            ? "bg-slate-900 text-white"
                            : "text-slate-700 hover:bg-slate-100"
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* MOBILE GOOGLE LOGIN */}

                {status !== "authenticated" && (
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-slate-900
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    Continue with Google
                  </button>
                )}

                {/* MOBILE LOGOUT */}

                {status === "authenticated" && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      rounded-xl
                      bg-red-50
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-red-600
                    "
                  >
                    Log Out
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 
          NAVBAR SPACER
       */}

      <div className="h-16" />
    </>
  );
}