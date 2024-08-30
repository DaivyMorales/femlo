import React, { useState } from "react";
import { TbArtboard, TbSend } from "react-icons/tb";
import * as svgIcons from "./svgs";
import { motion } from "framer-motion";

type SvgIconsType = typeof svgIcons & {
  [key: string]: React.ComponentType<any>;
};

function InputSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("next");

  const filteredIcons = svgIcons.icons.filter((icon) =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <motion.div
      key={1}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, scale: 0 }}
      className="flex flex-col items-center justify-center"
    >
      
      <div className="h-0 w-0 border-b-[6px] border-l-[8px] border-r-[8px] border-b-neutral-200 border-l-transparent border-r-transparent"></div>
      <div
        className={`flex w-[270px] flex-col items-start justify-center gap-3 rounded-xl border-[1px] pt-4 ${
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
            className="h-[50px] w-[200px] bg-transparent p-2 text-sm outline-none"
            type="text"
            id="placeholder"
            placeholder="Search companies"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-3 border-b-[1px] pb-3 text-neutral-400">
          <button className="cursor">
            <TbArtboard size={20} />
          </button>
          <button className="cursor">
            <TbSend size={18} />
          </button>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2">
          {filteredIcons.map((icon) => {
            const IconComponent = (svgIcons as SvgIconsType)[icon.name];
            return (
              <div
                draggable
                key={icon.name}
                className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-4 hover:bg-neutral-100"
              >
                <p className="text-sm"> {icon.name}</p>
                {IconComponent && (
                  <IconComponent
                    className="fill-neutral-200"
                    style={{ fontSize: 80 }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default InputSearch;
