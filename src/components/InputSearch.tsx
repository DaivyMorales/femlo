import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TbArtboard, TbSend } from "react-icons/tb";

function InputSearch() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex w-[400px] flex-col items-start justify-center gap-3 rounded-xl border-[1px] ${
        isFocused ? "border-blue-300 shadow-blue-200" : "border-neutral-200"
      } bg-neutral-50 px-5 pb-3 shadow-sm transition-colors duration-200`}
    >
      <div className="flex items-center justify-center gap-3">
        <img
          src="https://pbs.twimg.com/profile_images/1813691042253651968/lVYe7msL_400x400.jpg"
          alt=""
          width={30}
          height={30}
          className="rounded-full"
        />
        <input
          className="h-[50px] w-[320px] bg-transparent p-2 text-sm outline-none"
          type="text"
          id="placeholder"
          placeholder="Search anything"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete="off"
        />
      </div>

      <div className="flex w-full items-center gap-3 justify-end text-neutral-400">
        <button className="cursor">
          <TbArtboard size={20} />
        </button>
        <button className="cursor">
          <TbSend size={18} />
        </button>
      </div>
    </div>
  );
}

export default InputSearch;