import { animate, motion, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import {
  Spotify,
  X,
  Stripe,
  Discord,
  TikTok,
  LemonSqueezy,
  YouTube,
} from "./svgs";
import CardSVG from "@/components/CardSVG";
import { useEffect } from "react";

interface IconCarouselProps {
  duration: number;
  icons: { component: React.ElementType; size: number }[]; 
}

export default function IconCarousel({ duration, icons }: IconCarouselProps) {
  

  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    const iconWidth = icons.reduce((total, icon) => total + icon.size + 50, 0); 
    const totalWidth = iconWidth * 2; 

    const controls = animate(xTranslation, [-totalWidth / 2, 0], {
      ease: "linear",
      duration,
      repeat: Infinity,
      repeatType: "loop",
    });

    return controls.stop;
  }, [xTranslation, duration]);

  return (
    <div className="overflow-hidden w-full relative">
      <motion.div
        ref={ref}
        style={{ x: xTranslation }}
        className="flex gap-[50px]"
      >
        {[...icons, ...icons].map((items, index) => (
          <CardSVG items={items} key={index} />
        ))}
      </motion.div>
      <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white" />
      <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white" />
    </div>
  );
}