import React, { useEffect, useState, SetStateAction } from "react";
import { TbArtboard, TbSend } from "react-icons/tb";
import * as svgIcons from "./svgs";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "@/utils/api";
import { useSvgState } from "@/store/SvgSlice";
import { TbTrash } from "react-icons/tb";
import { useOpen } from "@/store/OpenSlice";
import { useGlobalData } from "@/store/GlobalDataSlice";

export interface svgProps {
  id: string;
  svgName: string;
  defaultSize: string | null;
}

interface InputSearchProps {
  svg: any;
  setSvg: any;
  searchRef?: React.ForwardedRef<HTMLDivElement>;
}

type SvgIconsType = typeof svgIcons & {
  [key: string]: React.ComponentType<any>;
};

function InputSearch({ svg, setSvg, searchRef }: InputSearchProps) {
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

  const { columnId, setOnHover } = useOpen();
  const { deleteColumn } = useGlobalData();

  const { mutate, error } = api.space.updateSpace.useMutation();
  const { mutateAsync } = api.space.deleteSpace.useMutation();

  return (
    <AnimatePresence>
      <motion.div
        ref={searchRef}
        key="container"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center"
      >
        <div className="hidden h-0 w-0 border-b-[6px] border-l-[8px] border-r-[8px] border-b-neutral-200 border-l-transparent border-r-transparent"></div>
        <div
          className={`flex w-[300px] flex-col items-start justify-center gap-3 rounded-t-xl border-[1px] pt-4 shadow-lg ${
            isFocused ? "border-blue-300 shadow-blue-200" : "border-neutral-200"
          } bg-neutral-50 px-5 pb-3 shadow-sm transition-colors duration-200`}
        >
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://ph-avatars.imgix.net/6251705/a9772e75-2fe8-41c2-8d90-04e32d3e8e1e.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2"
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
                setOnHover("");
              }}
              className="cursor rounded-lg p-1 hover:bg-neutral-100"
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
                        columnId,
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
