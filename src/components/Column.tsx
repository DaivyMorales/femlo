import { api } from "@/utils/api";
import { SetStateAction, useEffect, useState } from "react";
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
  setIsActive,
}: {
  id: string;
  companyId: string;
  setIsActive: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { data, refetch } = api.company.getCompanyById.useQuery({
    id: companyId,
  });

  const [svg, setSvg] = useState<svgProps | undefined>(
    data as svgProps | undefined,
  );
  const [isHovered, setIsHovered] = useState(false); // Local hover state

  useEffect(() => {
    refetch();
    setSvg(data as svgProps);
  }, [id, data]);

  const IconComponent = (svgIcons as SvgIconsType)[
    svg?.svgName || data?.svgName || ""
  ];

  const { onHover, columnId, setColumnId } = useOpen();

  return (
    <div
      className="relative"
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        key={id}
        draggable
        animate={columnId === id ? { scale: 1.2 } : { scale: 1 }}
        whileHover={{
          scale: columnId === id ? 1.2 : 1.1,
        }}
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          setIsActive(true);
          setColumnId(id);
        }}
        exit={{ scale: 0 }}
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
      <div className="absolute -right-[90px] top-[100px]">
        {columnId === id && <InputSearch svg={svg} setSvg={setSvg} />}
      </div>
    </div>
  );
};

export default Column;
