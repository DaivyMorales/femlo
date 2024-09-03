import { useSvgState } from "@/store/SvgSlice";
import { api } from "@/utils/api";
import { SetStateAction, useEffect } from "react";
import * as svgIcons from "../components/svgs";
import { motion } from "framer-motion";
import InputSearch from "./InputSearch";
import { useOpen } from "@/store/OpenSlice";

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

  useEffect(() => {
    refetch();
  }, [id]);

  const { svg } = useSvgState();

  const IconComponent = (svgIcons as SvgIconsType)[
    svg?.svgName ?? data?.svgName ?? ""
  ];

  const { columnId, setColumnId, onHover } = useOpen();

  return (
    <div className="relative">
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
            className={`${onHover === "delete" ? "fill-red-300" : "fill-neutral-400"} svg-transition `}
            style={{ fontSize: 90 }}
          />
        ) : (
          <span>1</span>
        )}
      </motion.div>
      <div className="absolute -right-[90px] top-[100px]">
        {columnId === id && <InputSearch />}
      </div>
    </div>
  );
};

export default Column;
