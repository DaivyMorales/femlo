import {
  Amazon,
  Discord,
  LemonSqueezy,
  Meta,
  Stripe,
  Uber,
  X,
} from "@/components/svgs";
import React from "react";
import { motion } from "framer-motion";
import { Tooltip, Button } from "@nextui-org/react";

function Example() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-[50px]">
      <Tooltip
        size="lg"
        showArrow={true}
        key="bottom"
        placement="bottom"
        content={
          <div className="px-1 py-1 text-[10px]">
            <div className="font-bold">Discord</div>
            <div className="text-[10px]">
              Chat platform for communities and gamers
            </div>
          </div>
        }
        delay={0}
        closeDelay={0}
        motionProps={{
          variants: {
            exit: {
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: "easeIn",
              },
            },
            enter: {
              opacity: 1,
              transition: {
                duration: 0.15,
                ease: "easeOut",
              },
            },
          },
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.7 }}
          style={{ display: "inline-flex" }}
          onClick={() => window.open("https://discord.com", "_blank")}
        >
          <Discord
            className="cursor-pointer hover:fill-neutral-500"
            style={{ fontSize: 200 }}
          />
        </motion.div>
      </Tooltip>
      {/* <Tooltip
        size="sm"
        showArrow={true}
        key="bottom"
        placement="bottom"
        content={
          <div className="px-1 py-1 text-[10px]">
            <div className="font-bold ">Amazon</div>
            <div className="text-[10px]">Online retailer for various products.</div>
          </div>
        }
        delay={0}
        closeDelay={0}
        motionProps={{
          variants: {
            exit: {
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: "easeIn",
              },
            },
            enter: {
              opacity: 1,
              transition: {
                duration: 0.15,
                ease: "easeOut",
              },
            },
          },
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.7 }}
          style={{ display: "inline-flex" }}
        >
          <Amazon
            className="cursor-pointer hover:fill-neutral-500"
            style={{ fontSize: 100 }}
          />
        </motion.div>
      </Tooltip>
      <Tooltip
        size="sm"
        showArrow={true}
        key="bottom"
        placement="bottom"
        content={
          <div className="px-1 py-1 text-[10px]">
            <div className="font-bold ">Uber</div>
            <div className="text-[10px]">Ride-hailing service <br /> for transportation needs</div>
          </div>
        }
        delay={0}
        closeDelay={0}
        motionProps={{
          variants: {
            exit: {
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: "easeIn",
              },
            },
            enter: {
              opacity: 1,
              transition: {
                duration: 0.15,
                ease: "easeOut",
              },
            },
          },
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.7 }}
          style={{ display: "inline-flex" }}
        >
          <Uber
            className="cursor-pointer hover:fill-neutral-500"
            style={{ fontSize: 80 }}
          />
        </motion.div> */}
      {/* </Tooltip> */}
    </div>
  );
}

export default Example;
