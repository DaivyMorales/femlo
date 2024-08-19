import React, { useState } from "react";
import { motion } from "framer-motion";

interface CardSVGProps {
  items: {
    component: any;
    size: number;
  };
}

const CardSVG: React.FC<CardSVGProps> = ({ items }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
      className="relative flex h-[115px] cursor-pointer items-center justify-center "
    >
     
      <items.component
        className="fill-neutral-400"
        style={{ fontSize: items.size }}
      />
    </motion.div>
  );
};

export default CardSVG;
