import React, { useEffect, useState, SetStateAction } from "react";
import { TbArtboard, TbSend } from "react-icons/tb";
import * as svgIcons from "./svgs";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "@/utils/api";
import { useSvgState } from "@/store/SvgSlice";
import { TbTrash } from "react-icons/tb";
import { useOpen } from "@/store/OpenSlice";
import { useGlobalData } from "@/store/GlobalDataSlice";

interface InputSearchProps {
  setColumns: React.Dispatch<
    React.SetStateAction<
      | {
          id: string;
          name: string;
          companyId: string | null;
        }[]
      | undefined
    >
  >;
}

type SvgIconsType = typeof svgIcons & {
  [key: string]: React.ComponentType<any>;
};

function InputSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: results, refetch } = api.company.searchCompanies.useQuery(
    { query: searchTerm },
    { enabled: false },
  );

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const { setSvg } = useSvgState();
  const { columnId, setOnHover } = useOpen();
  const { deleteColumn } = useGlobalData();
  

  const { mutate, error } = api.space.updateSpace.useMutation();
  const { mutateAsync } = api.space.deleteSpace.useMutation();

  return (
    <AnimatePresence>
      <motion.div
        key="container"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center"
      >
        <div className="h-0 w-0 border-b-[6px] border-l-[8px] border-r-[8px] border-b-neutral-200 border-l-transparent border-r-transparent"></div>
        <div
          className={`flex w-[300px] flex-col items-start justify-center gap-3 rounded-xl border-[1px] pt-4 ${
            isFocused ? "border-blue-300 shadow-blue-200" : "border-neutral-200"
          } bg-neutral-50  px-5 pb-3 shadow-sm transition-colors duration-200`}
        >
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://pbs.twimg.com/profile_images/1830615369628655616/PbwWqnT5_400x400.png"
              alt=""
              width={30}
              height={30}
              className="rounded-full"
            />
            <input
              className="h-[50px] w-[200px] bg-transparent p-2 text-sm outline-none"
              type="text"
              id="placeholder"
              placeholder="Search company"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div
            className={`flex w-full items-center justify-end gap-3 ${
              !searchTerm ? "" : "border-b-[1px] pb-3"
            } text-neutral-400`}
          >
            <button
              onMouseEnter={() => setOnHover("delete")}
              onMouseLeave={() => setOnHover("")}
              onClick={async () => {
                deleteColumn(columnId);
                await mutateAsync({ id: columnId });
              }}
              className="cursor hover:bg-neutral-100 p-1 rounded-lg"
            >
              <TbTrash size={18} />
            </button>
            <button className="cursor">
              <TbArtboard size={20} />
            </button>
            <button className="cursor">
              <TbSend size={18} />
            </button>
          </div>

          <div className="flex max-h-[300px] w-full flex-col items-center justify-center gap-2 overflow-y-auto">
            <AnimatePresence>
              {results?.map(({ id, svgName, defaultSize }, index) => {
                const IconComponent = (svgIcons as SvgIconsType)[svgName];
                return (
                  <motion.div
                    key={id}
                    onClick={() => {
                      setSvg({
                        id,
                        svgName,
                        defaultSize,
                      });
                      mutate({
                        id: columnId,
                        companyId: id,
                      });
                    }}
                    draggable
                    className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-4 hover:bg-neutral-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.1,
                    }}
                  >
                    <p className="text-sm font-medium">{svgName}</p>
                    {IconComponent && (
                      <IconComponent
                        className="fill-neutral-200"
                        style={{ fontSize: Number(defaultSize) || 80 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default InputSearch;
