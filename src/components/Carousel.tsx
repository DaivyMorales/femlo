import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalData } from "@/store/GlobalDataSlice";
import { api } from "@/utils/api";
import Column from "./Column";
import { useOpen } from "@/store/OpenSlice";

const Carousel = () => {
  const Data = [
    "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=662&q=80",
    "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80",
    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80",
  ];

  const { columns, setColumns } = useGlobalData();
  const { columnId } = useOpen();

  const query = api.space.getSpaces.useQuery();

  useEffect(() => {
    if (query.data) {
      setColumns(query.data as any[]);
    }
  }, [query.data]);

  const [FlowDirection, setFlowDirection] = useState(true);
  const [CenterId, setCenterId] = useState(0);
  const [LeftId, setLeftId] = useState(columns.length - 1);
  const [RightId, setRightId] = useState(1);

  const searchRef = useRef<HTMLDivElement>(null);

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
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <pre>{JSON.stringify(columns, null, 2)}</pre>
      <div className="flex gap-10">
        <p>{LeftId}</p>
        <p>{CenterId}</p> <p>{RightId}</p>
      </div>
      <motion.div className="grid place-content-center rounded-2xl bg-red-500">
        <motion.div className="relative h-40 w-40 flex justify-center items-center bg-blue-500">
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
            {/* <motion.div
              key={LeftId}
              variants={variants}
              initial={FlowDirection ? "center" : "leftHidden"}
              animate="left"
              exit={"leftHidden"}
              className="absolute h-40 w-40 rounded-full bg-yellow-300 bg-cover bg-center bg-no-repeat"
            ></motion.div>
            <motion.div
              key={CenterId}
              variants={variants}
              initial={FlowDirection ? "right" : "left"}
              animate="center"
              className="absolute h-40 w-40 rounded-full bg-cover bg-center bg-no-repeat"
            ></motion.div>
            <motion.div
              key={RightId}
              variants={variants}
              initial={FlowDirection ? "rightHidden" : "center"}
              animate="right"
              exit={"rightHidden"}
              className="absolute h-40 w-40 rounded-full bg-cover bg-center bg-no-repeat"
            ></motion.div> */}
          </AnimatePresence>
        </motion.div>
        <div className="z-10 my-8 flex justify-center gap-4 bg-yellow-500">
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
