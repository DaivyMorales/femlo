import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import * as svgIcons from "../components/svgs";
import { motion } from "framer-motion";
import InputSearch from "./InputSearch";
import { useOpen } from "@/store/OpenSlice";
import { svgProps } from "./InputSearch";

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
  position: 'left' | 'right' | 'center';
}) => {
  const { data, refetch } = api.company.getCompanyById.useQuery({
    id: companyId,
  });

  const [svg, setSvg] = useState<svgProps | undefined>(data as svgProps | undefined);

  useEffect(() => {
    refetch();
    setSvg(data as svgProps);
  }, [id, data]);

  const IconComponent = (svgIcons as SvgIconsType)[
    svg?.svgName || data?.svgName || ""
  ];

  const { onHover, columnId, setColumnId, setIsActive } = useOpen();

  let rotateValue = 0;
  if (position === 'left') {
    rotateValue = 3;
  } else if (position === 'right') {
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
          scale: columnId === id ? 1.2 : 1.1,
          rotate: columnId === id ? 0 : rotateValue,
        }}
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          setIsActive(true);
          setColumnId(id);
        }}
        exit={{ scale: 0, rotate: 0 }}
        className={`flex h-[80px] w-[130px] cursor-pointer items-center justify-center rounded-xl border-[1px] border-dashed ${
          columnId === id || columnId === "" ? "opacity-100" : "opacity-50"
        } ${
          onHover === "delete" && columnId === id
            ? "transition-border-shadow border-red-300 shadow-red-100"
            : "transition-border-shadow border-neutral-200"
        } bg-neutral-50 font-semibold text-neutral-200 shadow-sm`}
      >
        {IconComponent ? (
          <IconComponent
            className={`${onHover === "delete" && columnId === id ? "fill-red-300" : "fill-neutral-400"} svg-transition`}
            style={{ fontSize: 90 }}
          />
        ) : (
          <span>¿?</span>
        )}
      </motion.div>
      <div className="absolute -right-[86px] top-[100px]">
        {columnId === id ? (
          <InputSearch searchRef={searchRef} svg={svg} setSvg={setSvg} />
        ) : null}
      </div>
    </div>
  );
};

export default Column;