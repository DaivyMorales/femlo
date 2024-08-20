import React, { useEffect, useState } from "react";
import {
  motion,
  useViewportScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Airbnb,
  Amazon,
  Discord,
  Forbes,
  GitHub,
  Google,
  LemonSqueezy,
  MacPointer,
  Meta,
  Npm,
  ProductHunt,
  Reddit,
  Spotify,
  Stripe,
  Supabase,
  TheNewYorkTime,
  TikTok,
  Uber,
  X,
  YouTube,
} from "../components/svgs";
import { Avatar, Input, AvatarGroup } from "@nextui-org/react";
import { IoSearchSharp } from "react-icons/io5";
import ModalIU from "@/components/nextui/ModalUI";
import EndCard from "@/components/EndCard";
import IconCarousel from "../components/IconCarousel";
import { FaCheck } from "react-icons/fa6";
import Pricing from "@/components/Pricing";
import CodeBlock from "@/components/CodeBlock";
import { BiSave } from "react-icons/bi";
import { useFormik } from "formik";
import { useWaitlist } from "@/store/WaitlistSlice";
import { api } from "@/utils/api";

function Home() {
  const { scrollY } = useViewportScroll();
  const [scrollValue, setScrollValue] = useState(0);

  const [positions, setPositions] = useState({
    productHunt: { x: 0, y: 0 },
    supabase: { x: 0, y: 0 },
    forbes: { x: 0, y: 0 },
    meta: { x: 0, y: 0 },
    amazon: { x: 0, y: 0 },
  });

  useEffect(() => {
    setPositions({
      productHunt: { x: -160, y: -550 },
      supabase: { x: -350, y: -200 },
      forbes: { x: -100, y: -100 },
      meta: { x: 200, y: -500 },
      amazon: { x: 200, y: -200 },
    });

    const unsubscribe = scrollY.onChange((value) => {
      setScrollValue(value);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    initial: { scale: 0.9 },
    animate: { scale: 1.1 },
  };

  const transitionToCenter = (initialPosition: any) =>
    useTransform(scrollY, [0, 500], [initialPosition, 0]);

  const colorTransform = useTransform(
    scrollY,
    [0, 520],
    ["#E5E7EB", "#6B7280"],
  );

  const icons1 = [
    { component: Spotify, size: 120 },
    { component: X, size: 70 },
    { component: Stripe, size: 100 },
    { component: Discord, size: 120 },
    { component: TikTok, size: 120 },
    { component: LemonSqueezy, size: 200 },
    { component: YouTube, size: 150 },
  ];

  const icons2 = [
    { component: Amazon, size: 150 },
    { component: Airbnb, size: 120 },
    { component: GitHub, size: 100 },
    { component: Meta, size: 120 },
    { component: TikTok, size: 120 },
    { component: Npm, size: 120 },
    { component: Google, size: 120 },
  ];

  const icons3 = [
    { component: Spotify, size: 120 },
    { component: X, size: 70 },
    { component: Stripe, size: 100 },
    { component: Discord, size: 120 },
    { component: TikTok, size: 120 },
    { component: LemonSqueezy, size: 200 },
    { component: YouTube, size: 150 },
  ];

  const icons4 = [
    { component: Amazon, size: 150 },
    { component: Airbnb, size: 120 },
    { component: GitHub, size: 100 },
    { component: Meta, size: 120 },
    { component: TikTok, size: 120 },
    { component: Npm, size: 120 },
    { component: Google, size: 120 },
  ];
  
  const query = api.waitlist.getWaitlistNumber.useQuery()

  return (
    <div className="relative flex h-full w-screen flex-col items-center justify-start overflow-hidden">
      <div className="flex h-[1000px] w-full flex-col items-center justify-start gap-[100px] overflow-hidden">
        <div className="mt-[50px] w-[600px]">
          <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-center w-[800px]">
            Generate confidence, <br />and sell in seconds
            </h1>
            <p className="text-center">
            Create eye-catching “Trusted By” sections for your landing-page,
             build credibility and trust with your audience.
            </p>
            <div className="flex flex-col items-center gap-1">
              {/* <Button size="lg" className="font-semibold">
                Try now
              </Button> */}
              <ModalIU size="lg" text="Create Now" />
              <p className="text-[15px]">Join in the wailist.</p>
            </div>
            <div className="flex items-center gap-1">
              <AvatarGroup
                isBordered
                max={3}
                total={10}
                renderCount={(count) => (
                  <p className="ms-2 text-small font-medium text-foreground">
                    +{query.data} waiting for Femlo
                  </p>
                )}
              >
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
              </AvatarGroup>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <motion.div
            className="flex items-center gap-10 rounded-xl px-7 py-1"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {/* PRODUCT HUNT */}
            <motion.div
              style={{
                x: transitionToCenter(positions.productHunt.x),
                y: transitionToCenter(positions.productHunt.y),
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              className="relative cursor-pointer"
            >
              <AnimatePresence>
                {scrollValue < 520 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MacPointer
                      className="absolute bottom-[0px] right-12"
                      style={{ fontSize: 40 }}
                    />
                  </motion.div>
                )}
                {scrollValue < 520 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="py-[1px ] absolute -bottom-[10px] right-8 rounded-sm bg-blue-600 px-1 font-sans text-[8px] font-semibold text-white">
                      ProductHunt.svg
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div style={{ fill: colorTransform }}>
                <ProductHunt className="h-[65px]" style={{ fontSize: 180 }} />
              </motion.div>
            </motion.div>

            {/* SUPABASE */}
            <motion.div
              style={{
                x: transitionToCenter(positions.supabase.x),
                y: transitionToCenter(positions.supabase.y),
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer"
            >
              <AnimatePresence>
                {scrollValue < 520 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MacPointer
                      className="absolute bottom-[52px] right-12"
                      style={{ fontSize: 40 }}
                    />
                  </motion.div>
                )}
                {scrollValue < 520 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute bottom-[40px] right-12 rounded-sm bg-blue-600 px-1 py-[1px] font-sans text-[8px] font-semibold text-white">
                      Supabase.svg
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div style={{ fill: colorTransform }}>
                <Supabase style={{ fontSize: 180 }} />
              </motion.div>
            </motion.div>

            {/* FORBES */}
            <motion.div
              style={{
                x: transitionToCenter(positions.forbes.x),
                y: transitionToCenter(positions.forbes.y),
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer"
            >
              <AnimatePresence>
                {scrollValue < 520 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MacPointer
                      className="absolute -bottom-[2px] right-12"
                      style={{ fontSize: 40 }}
                    />
                  </motion.div>
                )}
                {scrollValue < 520 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute -bottom-[10px] right-12 rounded-sm bg-blue-600 px-1 py-[1px] font-sans text-[8px] font-semibold text-white">
                      Forbes.svg
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div style={{ fill: colorTransform }}>
                <Forbes className="h-[65px]" style={{ fontSize: 120 }} />
              </motion.div>
            </motion.div>

            {/* META */}
            <motion.div
              style={{
                x: transitionToCenter(positions.meta.x),
                y: transitionToCenter(positions.meta.y),
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              className="relative"
            >
              <AnimatePresence>
                {scrollValue < 520 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MacPointer
                      className="absolute bottom-[22px] right-12"
                      style={{ fontSize: 40 }}
                    />
                  </motion.div>
                )}
                {scrollValue < 520 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute bottom-[15px] right-12 rounded-sm bg-blue-600 px-1 py-[1px] font-sans text-[8px] font-semibold text-white">
                      Meta.svg
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div style={{ fill: colorTransform }}>
                <Meta style={{ fontSize: 120 }} />
              </motion.div>
            </motion.div>

            {/* AMAZON */}
            <motion.div
              style={{
                x: transitionToCenter(positions.amazon.x),
                y: transitionToCenter(positions.amazon.y),
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              className="relative cursor-pointer"
            >
              <AnimatePresence>
                {scrollValue < 520 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MacPointer
                      className="absolute bottom-[50px] right-12"
                      style={{ fontSize: 40 }}
                    />
                  </motion.div>
                )}
                {scrollValue < 520 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="py-[1px ] absolute bottom-[40px] right-12 rounded-sm bg-blue-600 px-1 font-sans text-[8px] font-semibold text-white">
                      Amazon.svg
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div style={{ fill: colorTransform }}>
                <Amazon style={{ fontSize: 170 }} />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            Trusted By
          </motion.p>
        </div>
      </div>
      <div  className="flex h-screen w-full items-center justify-center">
        <div className="items-e flex h-screen w-[1000px] flex-col justify-center gap-6 px-24">
          <div className="flex w-full flex-col items-start justify-start gap-5">
            <p   className="font-caveat text-2xl font-bold text-[#5DC34E]">
              Speed
            </p>
            <h2 className="flex items-center gap-3 text-start text-5xl">
              Search from +50 companies <br /> that trust your startup{" "}
            </h2>
            <p className="text-center text-neutral-700">
              Show your customers which companies use your product.
            </p>
            <Input size="lg" placeholder="Search anything!" />
          </div>
          <div className="">
            <IconCarousel duration={17} icons={icons1} />
            <IconCarousel duration={14} icons={icons2} />
            <IconCarousel duration={12} icons={icons3} />
            <IconCarousel duration={13} icons={icons4} />
          </div>
        </div>

        <div className="h-screen w-[600px] bg-neutral-300">
          <img src="/Iphone.png" alt="" />
        </div>
      </div>
      <div id="how-it-works" className="relative flex h-screen w-full items-start justify-start bg-blue-600">
        <div className="flex h-screen w-[520px] flex-col items-start justify-center gap-6 px-10">
          <p className="font-caveat text-2xl font-bold text-[#5DC34E]">
            Interactive
          </p>
          <h2 className="text-start text-5xl text-white">Drag and Drop</h2>
          <p className="text-start text-neutral-300">
            Make it simple, make it easy, just drag what matters and drop the
            rest.
          </p>
          <div className="flex flex-col">
            <div className="flex items-center gap-4 font-semibold text-white">
              <FaCheck color="white" /> Instant customization
            </div>
            <div className="flex items-center gap-4 font-semibold text-white">
              <FaCheck color="white" /> Streamlined workflow
            </div>
            <div className="flex items-center gap-4 font-semibold text-white">
              <FaCheck color="white" /> Real-time design preview
            </div>
          </div>
        </div>
        <img
          src="/Example.png"
          width={800}
          className="absolute -right-7 top-20"
          alt=""
        />
      </div>
      <div className="flex w-screen flex-col items-center justify-center">
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-caveat text-2xl font-bold text-[#5DC34E]">
              + Interactions
            </p>
            <img src="/Hover.png" width={600} className="" alt="" />
          </div>
          <div className="flex h-screen w-[520px] flex-col items-start justify-center gap-10 px-10">
            <h2 className="flex items-center gap-3 text-start text-5xl">
              Hover <span className="font-bold text-neutral-400">=</span>
              <div className="-gap-[10px] flex flex-col items-center justify-center text-5xl">
                {" "}
                Animation <span className="font-bold text-neutral-400">
                  +
                </span>{" "}
                Information
              </div>
            </h2>
            <p className="text-start text-neutral-400">
              Make sure your customers know who you are working with.{" "}
              <span className="font-bold text-neutral-500">
                Can you believe that some people don't know what Discord is?
              </span>
            </p>

            <ModalIU size="lg" text="Try Now" />
          </div>
        </div>
        <section className="flex items-center justify-center">
          <div className="flex w-[520px] flex-col items-start justify-center gap-10 px-10">
            <h2 className="flex items-center gap-3 text-start text-5xl">
              Copy + Page
            </h2>
            <p className="text-start text-neutral-400">
              Get the exact code of the section you built and paste it into any{" "}
              <span className="font-bold text-neutral-500">web project</span>.
            </p>

            <ModalIU size="lg" text="Try Now" />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-caveat text-2xl font-bold text-[#5DC34E]">
              Easiest
            </p>
            <div className="rotate-[2deg] rounded-[10px] border-[1px] bg-white shadow-sm">
              <div className="flex h-[40px] w-full items-center justify-center gap-2 rounded-t-[10px] border-b-[1px] border-neutral-100 px-4">
                <div className="h-[10px] w-[10px] rounded-full bg-neutral-300" />
                <div className="h-[10px] w-[10px] rounded-full bg-neutral-300" />
                <div className="h-[10px] w-[10px] rounded-full bg-neutral-300" />
                <div className="flex w-full items-center justify-center font-sans text-xs font-bold text-neutral-500">
                  index.html -- femlo
                </div>
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  className="cursor-pointer"
                >
                  <BiSave color="#a3a3a3" />
                </motion.div>
              </div>
              <div className="flex items-center justify-start px-4">
                <div className="h-[240px] w-[30px] border-r-[1px] border-neutral-100"></div>
                <CodeBlock />
              </div>
            </div>
          </div>
        </section>
        <Pricing />
      </div>
      {/* <EndCard /> */}
    </div>
  );
}

export default Home;
