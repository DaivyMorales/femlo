import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import * as svgIcons from "../components/svgs";
import { motion } from "framer-motion";
import InputSearch from "./InputSearch";
import { useOpen } from "@/store/OpenSlice";
import { svgProps } from "./InputSearch";
import { CgSpinner } from "react-icons/cg";
import { BsPlayCircle } from "react-icons/bs";
import { useSvgState } from "@/store/SvgSlice";
import { Tooltip, Button } from "@nextui-org/react";

type SvgIconsType = typeof svgIcons & {
  [key: string]: React.ComponentType<any>;
};

const Column = ({
  id,
  companyId,
  searchRef,
  position,
}: {
  id: string;
  companyId: string;
  searchRef: React.ForwardedRef<HTMLDivElement>;
  position: "left" | "right" | "center";
}) => {
  const { data, refetch, isLoading } = api.company.getCompanyById.useQuery({
    id: companyId,
  });

  const [svg, setSvg] = useState<svgProps | undefined>(
    data as svgProps | undefined,
  );

  const {
    onHover,
    columnId,
    setColumnId,
    setIsActive,
    setOpenInputSearch,
    showInfoHover,
  } = useOpen();

  const { svg: svgSelected } = useSvgState();

  useEffect(() => {
    setSvg(data);
  }, []);

  useEffect(() => {
    if (columnId === id) {
      setSvg(svgSelected);
    }
  }, [columnId, svgSelected]);

  useEffect(() => {
    refetch();
    setSvg(data as svgProps);
  }, [id, data]);

  useEffect(() => {
    if (columnId === "") {
      refetch();
    }
  }, [columnId]);

  const IconComponent = (svgIcons as SvgIconsType)[
    svg?.svgName || data?.svgName || ""
  ];

  let rotateValue = 0;
  if (position === "left") {
    rotateValue = 3;
  } else if (position === "right") {
    rotateValue = -3;
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0.9, rotate: 0 }}
        key={id}
        draggable
        animate={{
          scale: columnId === id ? 1.2 : 1,
          rotate: columnId === id ? 0 : rotateValue,
        }}
        whileHover={{
          scale: position === "center" ? 1.2 : 1,
          rotate: position === "center" ? 0 : rotateValue,
        }}
        whileTap={{ scale: position === "center" ? 0.8 : 1 }}
        onClick={() => {
          if (position === "center") {
            setIsActive(true);
            setColumnId(id);
            setOpenInputSearch(true);
          }
        }}
        exit={{ scale: 0, rotate: 0 }}
        className={`flex h-[68px] w-[110px] cursor-pointer items-center justify-center rounded-xl border-[1px] border-dashed ${
          columnId === id || columnId === "" ? "opacity-100" : "opacity-50"
        } ${
          onHover === "delete" && columnId === id
            ? "transition-border-shadow border-red-300 shadow-red-100"
            : "transition-border-shadow border-neutral-200"
        } bg-neutral-50 font-semibold text-neutral-200 shadow-sm md:h-[76px] md:w-[124px] lg:md:h-[80px] lg:w-[130px]`}
      >
        {IconComponent && svg ? (
          <IconComponent
            className={` ${onHover === "delete" && columnId === id ? "fill-red-300" : "fill-neutral-400"} svg-transition text-[70px] md:text-[82px] lg:text-[92px]`}
          />
        ) : (
          <div className="text-neutral-300">¿?</div>
        )}
      </motion.div>
      {position === "center" && showInfoHover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 1 }}
          className="absolute -left-[10px] top-[100px] flex flex-col items-center justify-center"
        >
          <div className="relative h-0 w-0 border-b-[6px] border-l-[6px] border-r-[6px] border-b-neutral-100 border-l-transparent border-r-transparent"></div>
          <div className="flex w-[150px] flex-col gap-1 rounded-xl border-[0.6px] bg-white p-2 text-[9px] shadow-sm">
            <span className="text-[9px] font-bold">{data?.svgName}</span>
            <span className="text-[7px]">
              Lorem ipsum dolor sit, amet consectetur br adipisicing elit.
              Nulla, qui?
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Column;
