import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalData } from "@/store/GlobalDataSlice";
import { api } from "@/utils/api";
import Column from "./Column";
import { useOpen } from "@/store/OpenSlice";

const Carousel = () => {
  const { columns, setColumns } = useGlobalData();
  const { columnId } = useOpen();

  const query = api.space.getSpaces.useQuery();

  useEffect(() => {
    if (query.data) {
      setColumns(query.data as any[]);
    }
  }, [query.data]);

  useEffect(() => {
    if (columns.length > 0) {
      setLeftId(columns.length - 1);
      setCenterId(0);
      setRightId(1);
    }
  }, [columns]);

  const [FlowDirection, setFlowDirection] = useState(true);
  const [CenterId, setCenterId] = useState(0);
  const [LeftId, setLeftId] = useState(columns.length - 1);
  const [RightId, setRightId] = useState(1);

  const searchRef = useRef<HTMLDivElement>(null);

  const nextBtn = () => {
    setLeftId(CenterId); // El antiguo centro se convierte en el nuevo izquierda
    setCenterId(RightId); // El antiguo derecha se convierte en el nuevo centro
    setRightId((prev) => (prev + 1) % columns.length); // La siguiente columna en la secuencia
    setFlowDirection(true);
  };

  const prevBtn = () => {
    setFlowDirection(false);
    setRightId(CenterId); // El antiguo centro se convierte en el nuevo derecha
    setCenterId(LeftId); // El antiguo izquierda se convierte en el nuevo centro
    setLeftId((prev) => (prev - 1 + columns.length) % columns.length); // La columna anterior en la secuencia
  };

  const variants = {
    center: {
      x: "0rem",
      opacity: 1,
      scale: 1.1,
      zIndex: 5,
      filter: "brightness(100%)",
      transition: {
        type: "spring",
        duration: 1,
      },
    },
    left: {
      x: "-6rem",
      opacity: 1,
      filter: "brightness(40%)",
      scale: 1,
      zIndex: 4,
      boxShadow: "unset",
      transition: {
        type: "spring",
        duration: 1,
      },
    },
    right: {
      x: "6rem",
      opacity: 1,
      filter: "brightness(40%)",
      scale: 1,
      boxShadow: "unset",
      zIndex: 3,
      transition: {
        type: "spring",
        duration: 1,
      },
    },
    hidden: {
      x: "10rem", 
      opacity: 0,
      scale: 0,
      zIndex: 1,
    },
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <motion.div className="grid place-content-center rounded-2xl">
        <motion.div className="relative flex h-40 w-[600px] items-center justify-center bg-red-500 p-10">
          <AnimatePresence initial={false}>
            {columns && (
              <AnimatePresence mode="popLayout">
                {columns.map((column, index) => {
                  let position: "center" | "left" | "right" | "hidden" =
                    "hidden";

                  if (index === LeftId) {
                    position = "left";
                  } else if (index === CenterId) {
                    position = "center";
                  } else if (index === RightId) {
                    position = "right";
                  }

                  return (
                    <motion.div
                      key={column.id}
                      variants={variants}
                      initial={
                        FlowDirection
                          ? position === "left"
                            ? "rightHidden"
                            : "leftHidden"
                          : "leftHidden"
                      }
                      animate={position}
                      exit={FlowDirection ? "rightHidden" : "leftHidden"}
                      className="absolute"
                    >
                      <Column
                        key={column.id}
                        {...column}
                        companyId={column.companyId || ""}
                        position={position as "center" | "left" | "right"}
                        searchRef={searchRef}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </AnimatePresence>
        </motion.div>
        <div className="z-10 my-8 flex justify-center gap-4">
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              duration: 0.5,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="w-20 cursor-pointer rounded-lg bg-gray-800 px-4 py-2 font-bold uppercase tracking-wider text-white"
            onClick={prevBtn}
          >
            Back
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              duration: 0.5,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="w-20 cursor-pointer rounded-lg bg-gray-800 px-4 py-2 font-bold uppercase tracking-wider text-white"
            onClick={nextBtn}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Carousel;
