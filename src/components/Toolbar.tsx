import React from "react";
import { TbArtboard, TbSend, TbArrowBarBoth, TbArrowsMaximize } from "react-icons/tb";


function Toolbar() {
  return (
    <div
      className={`flex w-[270px] flex-col items-start justify-center gap-3 rounded-xl border-[1px] border-neutral-200 bg-neutral-50 px-5 py-3 shadow-sm transition-colors duration-200`}
    >
      <div className="flex w-full items-center justify-end gap-3 text-neutral-400">
        <button className="cursor">
          <TbArrowsMaximize   size={20} />
        </button>
        <button className="cursor">
          <TbArtboard size={20} />
        </button>
        <button className="cursor">
          <TbArrowBarBoth size={20} />
        </button>
        <button className="cursor">
          <TbSend size={18} />
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
