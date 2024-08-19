import { Button } from "@nextui-org/react";
import React from "react";

function EndCard() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex h-[500px] w-[1200px] flex-col items-center justify-center gap-8 rounded-xl bg-neutral-700 text-white">
        <h3 className="text-center font-sans text-6xl font-black tracking-tighter">
          We’re making <br /> job referrals accessible for <br />{" "}
          <span className="text-neutral-400">everyone</span>
        </h3>
        <Button
          variant="flat"
          size="lg"
          className="bg-white    font-semibold capitalize text-black"
        >
          Try Now
        </Button>
      </div>
    </div>
  );
}

export default EndCard;
