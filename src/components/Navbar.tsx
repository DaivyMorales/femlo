import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import React, { ReactNode } from "react";
import { Femlo } from "./svgs";
import ModalUI from "./nextui/ModalUI";

function Navbar({ children }: { children: ReactNode }) {
  return (
    <main>
      <Nav>
        <NavbarBrand>
          <Femlo
            className="fill-neutral-500"
            style={{ fontSize: 45 }}
          />
        </NavbarBrand>
        <NavbarContent className="hidden gap-4 sm:flex" justify="end">
          <NavbarItem >
            <Link href="#how-it-works" color="foreground" className="text-[14px]" >
              How it works
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#pricing" color="foreground" className="text-[14px]">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem>
            <ModalUI size="sm" text="Create Now"/>
          </NavbarItem>
        </NavbarContent>
      </Nav>
      {children}
    </main>
  );
}

export default Navbar;
