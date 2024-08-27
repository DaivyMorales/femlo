import React from "react";
import { Femlo } from "./svgs";
import Link from "next/link";

function Footer() {
  return (
    <section className="grid h-screen grid-cols-1 grid-rows-2">
      <div className="h-full w-screen bg-[#0F0B3C]"></div>
      <div className="flex h-screen w-full flex-col items-start px-10 justify-center border-t gap-10 border-neutral-100 p-4 text-neutral-700 sm:h-full sm:p-6 sm:p-0 sm:items-center sm:justify-center">
        <ul className="flex flex-col justify-start gap-10 md:flex-row md:items-start md:justify-center  md:gap-20 ">
          <li className="space-y-3">
            <h4 className="text-[18px] font-bold text-black">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#how-it-works" className="text-sm hover:underline">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm hover:underline">
                  Pricing
                </Link>
              </li>
            </ul>
          </li>
          <li className="space-y-3">
            <h4 className="text-[18px] font-bold text-black">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:underline">
                  Privacy
                </Link>
              </li>
            </ul>
          </li>
          <li className="space-y-3">
            <h4 className="text-[18px] font-bold text-black">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://x.com/DaivyMorales_"
                  target="_blank"
                  className="text-sm hover:underline"
                >
                  X (Twitter)
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <div className="mt-10">
          <p className="text-sm font-medium text-neutral-500 sm:text-sm">
            © 2024 Femlo. All rights reserved
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
