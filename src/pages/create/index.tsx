import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { api } from "@/utils/api";
import { LuPlus } from "react-icons/lu";
import Column from "@/components/Column";
import { Space, useGlobalData } from "@/store/GlobalDataSlice";
import { useOpen } from "@/store/OpenSlice";
import { motion } from "framer-motion";
import InputSearch from "@/components/InputSearch";
import { useSvgState } from "@/store/SvgSlice";
import { BsPlayCircle } from "react-icons/bs";

function Create() {
  const query = api.space.getSpaces.useQuery();
  const mutation = api.space.create.useMutation();
  const searchRef = useRef<HTMLDivElement>(null);

  const [svgSelected, setSvgSelected] = useState({});

  const { columns, setColumns, createColumn } = useGlobalData();
  const { setColumnId, columnId } = useOpen();
  const { setSvg, svg } = useSvgState();

  //CAROUSEL
  const [FlowDirection, setFlowDirection] = useState(true);
  const [CenterId, setCenterId] = useState(0);
  const [LeftId, setLeftId] = useState(columns.length - 1);
  const [RightId, setRightId] = useState(1);

  const nextBtn = () => {
    setLeftId(CenterId);
    setCenterId(RightId);
    setRightId((prev) => (prev + 1) % columns.length);
    setFlowDirection(true);
  };

  const prevBtn = () => {
    setFlowDirection(false);
    setRightId(CenterId);
    setCenterId(LeftId);
    setLeftId((prev) => (prev - 1 + columns.length) % columns.length);
  };

  useEffect(() => {
    if (query.data) {
      setColumns(query.data as Space[]);
    }
  }, [query.data]);

  useEffect(() => {
    if (columns.length > 0) {
      setLeftId(columns.length - 1);
      setCenterId(0);
      setRightId(1);
    }
  }, [columns]);

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
      transition: {
        type: "spring",
        duration: 1,
      },
    },
    left: {
      x: "-6rem",
      opacity: 1,
      filter: "brightness(55%)",
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
      filter: "brightness(55%)",
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


  useEffect(() => {
    if (columnId === "") {
      setSvg({
        id: "",
        svgName: "",
        defaultSize: "",
      });
    }
  }, [columnId]);

  return (
    <div
      className={`flex h-screen w-screen flex-col items-center justify-${columnId !== "" ? "between" : "center"} px-10`}
    >
      <div>
        {/* <pre>{JSON.stringify(svg, null, 2)}</pre> */}
      </div>
      <div className="">
        <AnimatePresence mode="popLayout">
          <div className="flex items-center justify-between gap-3">
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
            <button
              onClick={nextBtn}
              className="rounded-full border-[1px] bg-white p-1 text-xs font-medium text-black text-white shadow-sm"
            >
              Next
            </button>
            <button
              onClick={nextBtn}
              className="jsutify-center flex items-center gap-1 rounded-[10px] border-[1px] border-blue-700 bg-blue-600 p-1 px-3 text-xs font-medium text-black text-white shadow-sm"
            >
              <BsPlayCircle /> Play
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-center gap-6">
              <motion.div className="relative flex h-40 w-[280px] items-center justify-center">
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
                            key={index}
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
            </div>
          </div>
        </AnimatePresence>
      </div>
      {columnId !== "" && (
        <div>
          <InputSearch svg={svg} setSvg={setSvg} searchRef={searchRef} />
        </div>
      )}
    </div>
  );
}

export default Create;
