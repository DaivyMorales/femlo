import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { api } from "@/utils/api";
import { LuPlus } from "react-icons/lu";
import Column from "@/components/Column";
import { Space, useGlobalData } from "@/store/GlobalDataSlice";
import { useOpen } from "@/store/OpenSlice";
import { motion } from "framer-motion";

function Create() {
  const query = api.space.getSpaces.useQuery();
  const mutation = api.space.create.useMutation();
  const searchRef = useRef<HTMLDivElement>(null);

  const { columns, setColumns, createColumn } = useGlobalData();
  const { setColumnId, columnId } = useOpen();

  //CAROUSEL
  const [FlowDirection, setFlowDirection] = useState(true);
  const [CenterId, setCenterId] = useState(0);
  const [LeftId, setLeftId] = useState(columns.length - 1);
  const [RightId, setRightId] = useState(1);

  const nextBtn = () => {
    setLeftId((prev) => (prev === columns.length - 1 ? 0 : prev + 1));
    setCenterId((prev) => (prev === columns.length - 1 ? 0 : prev + 1));
    setRightId((prev) => (prev === columns.length - 1 ? 0 : prev + 1));
    setFlowDirection(true);
  };

  const prevBtn = () => {
    setFlowDirection(false);
    setLeftId((prev) => (prev === 0 ? columns.length - 1 : prev - 1));
    setCenterId((prev) => (prev === 0 ? columns.length - 1 : prev - 1));
    setRightId((prev) => (prev === 0 ? columns.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (query.data) {
      setColumns(query.data as Space[]);
    }
  }, [query.data]);

  const handleAddColumn = async () => {
    try {
      const newColumn = await mutation.mutateAsync();
      createColumn(newColumn);
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
        setColumnId("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const variants = {
    center: {
      x: "0rem",
      opacity: 1,
      scale: 1.1,
      zIndex: 5,
      filter: "brightness(100%)",
      boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.3)",
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
    rightHidden: {
      x: "8rem",
      scale: 0,
      opacity: 0,
    },
    leftHidden: {
      x: "-8rem",
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 px-10">
      <AnimatePresence mode="popLayout">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={prevBtn}
              className="rounded-full border-[1px] bg-white p-1 text-xs font-medium text-black text-white shadow-sm"
            >
              Back
            </button>
            <button
              onClick={handleAddColumn}
              className="rounded-full border-[1px] bg-white p-1 text-xs font-medium text-black text-white shadow-sm"
            >
              <LuPlus color="#a1a1aa" size={10} />
            </button>
            <motion.div className="relative h-40 w-[500px] bg-blue-500">
              <AnimatePresence initial={false}>
                {columns && (
                  <AnimatePresence mode="popLayout">
                    {columns.map(({ id, companyId }, index) => {
                      let position: "left" | "right" | "center" = "center";

                      if (index === LeftId) {
                        position = "left";
                      } else if (index === CenterId) {
                        position = "center";
                      } else if (index === RightId) {
                        position = "right";
                      }

                      return (
                        <motion.div
                          key={id}
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
                            searchRef={searchRef}
                            key={id}
                            id={id}
                            companyId={companyId || "defaultId"}
                            position={position}
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </AnimatePresence>
            </motion.div>
            <button
              onClick={handleAddColumn}
              className="rounded-full border-[1px] bg-white p-1 text-xs font-medium text-black text-white shadow-sm"
            >
              <LuPlus color="#a1a1aa" size={10} />
            </button>
            <button
              onClick={prevBtn}
              className="rounded-full border-[1px] bg-white p-1 text-xs font-medium text-black text-white shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}

export default Create;
