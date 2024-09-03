import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputSearch from "@/components/InputSearch";
import Toolbar from "@/components/Toolbar";
import { api } from "@/utils/api";
import { useSvgState } from "@/store/SvgSlice";
import * as svgIcons from "../../components/svgs";
import { Dispatch, SetStateAction } from "react";
import { LuPlus } from "react-icons/lu";
import { TbTrash } from "react-icons/tb";
import Column from "@/components/Column";
import { Space, useGlobalData } from "@/store/GlobalDataSlice";

function Create() {
  const query = api.space.getSpaces.useQuery();
  const mutation = api.space.create.useMutation();
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { columns, setColumns, createColumn } = useGlobalData();

  useEffect(() => {
    if (query.data) {
      setColumns(query.data);
    }
  }, [query.data]);

  const handleAddColumn = async () => {
    try {
      const newColumn = await mutation.mutateAsync();
      createColumn(newColumn)
    } catch (error) {
      console.error("Error creating column:", error);
    }
  };



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { setSpaces } = useSvgState();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <AnimatePresence mode="popLayout">
        <div className="flex flex-col items-center justify-center gap-5">
          {/* <Toolbar /> */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handleAddColumn}
              className="rounded-full border-[1px] bg-white p-1 text-xs font-medium text-black text-white shadow-sm"
            >
              <LuPlus color="#a1a1aa" size={10} />
            </button>
            {columns &&
              columns.map(({ id, companyId }) => (
                <Column
                  key={id}
                  id={id}
                  companyId={companyId || "defaultId"}
                  setIsActive={setIsActive}
                />
              ))}
            <button
              onClick={handleAddColumn}
              className="rounded-full border-[1px] bg-white p-1 text-xs font-medium text-black text-white shadow-sm"
            >
              <LuPlus color="#a1a1aa" size={10} />
            </button>
          </div>
          {/* {isActive && (
            <div ref={searchRef}>
              <InputSearch  />
            </div>
          )} */}
        </div>
      </AnimatePresence>
    </div>
  );
}

type CardProps = {
  id: number;
  component: React.ElementType;
  size: number;
  column: string;
};

const Card: React.FC<CardProps> = ({
  id,
  component: Component,
  size,
  column,
}) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <DropIndicator beforeId="-1" column={column} />
      <motion.div key={id} className="cursor-pointer" draggable>
        <Component className="fill-neutral-600" style={{ fontSize: size }} />
      </motion.div>
    </div>
  );
};

const DropIndicator = ({ beforeId, column }: any) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="h-[50px] w-[3px] rounded-full bg-blue-400 opacity-0"
    ></div>
  );
};

export default Create;
