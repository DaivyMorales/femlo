import {
  Amazon,
  Femlo,
  GitHub,
  LemonSqueezy,
  ProductHunt,
  Spotify,
  Uber,
} from "@/components/svgs";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputSearch from "@/components/InputSearch";
import Toolbar from "@/components/Toolbar";
import { api } from "@/utils/api";

const DEFAULTS_COLUMNS = [
  { id: "a" },
  //   { id: "b" },
  //   { id: "c" },
  //   { id: "d" },
  //   { id: "e" },
];

function Create() {
  const query = api.space.getSpaces.useQuery();

  console.log(query.data)

  const [columns] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <AnimatePresence mode="popLayout">
        <div className="flex flex-col items-center justify-center gap-5">
          <Toolbar />
          <div className="flex items-center gap-6">
            {columns &&
              columns.map(({ id }) => (
                <motion.div
                  draggable
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setIsActive(true)}
                  className="flex h-[80px] w-[130px] cursor-pointer items-center justify-center rounded-xl border-[1px] border-dashed border-neutral-200 bg-neutral-50 font-semibold text-neutral-200 shadow-sm"
                >
                  1
                </motion.div>
              ))}
          </div>
          {isActive && (
            <div ref={searchRef}>
              {" "}
              <InputSearch />{" "}
            </div>
          )}
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
