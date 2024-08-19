import React from "react";
import { Femlo } from "./svgs";
import Link from "next/link";

function Footer() {
  return (
    <div className="flex h-[250px] w-full flex-col items-center justify-center gap-10 bg-neutral-50">
      <Femlo className="fill-blue-500" style={{ fontSize: 70 }} />
      <ul className="flex gap-6">
        <li>
          <Link href="#how-it-works" color="foreground" className="text-[14px]">
            How it works
          </Link>
        </li>
        <li>
          <Link href="#pricing" color="foreground" className="text-[14px]">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="https://x.com/DaivyMorales_" target="_blank"  color="foreground" className="text-[14px]">
            Contact
          </Link>
        </li>
        <li>
          <Link href="/" color="foreground" className="text-[14px]">
            Terms
          </Link>
        </li>
        <li>
          <Link href="/" color="foreground" className="text-[14px]">
            Privacy
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
