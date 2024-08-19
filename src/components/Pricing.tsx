import React from "react";
import ModalUI from "./nextui/ModalUI";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

function Pricing() {
  return (
    <section id="pricing" className="flex h-screen w-full flex-col items-center justify-center gap-10 px-10">
      <h1 className="text-center">The best? Use it for free</h1>
      <div className="relative ">
        <img src="/Arrow.svg" width={60} className="absolute -left-[60px] top-[200px]" />
        <img src="/text-pricing.png" width={200} className="absolute -left-[140px] top-[280px]" />
        <section className="flex h-[200px] w-[700px] rounded-[20px] border-1 bg-neutral-50 shadow-sm">
          <div className="flex flex-col items-center justify-center gap-1 rounded-l-[20px] border-r-[1px] bg-white px-4">
            <p className="text-[15px] font-semibold text-neutral-400 line-through decoration-blue-500">
              $30/month
            </p>
            <div className="flex items-end gap-1">
              <h1>$0</h1>
              <span className="text-[20px] font-medium"> / month</span>
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            <div className="grid w-full grid-cols-3 gap-6 rounded-xl p-5 text-sm">
              <div className="flex items-center gap-2">
                <IoCheckmarkCircleSharp color="#2563eb" /> +50 Company logos
              </div>
              <div className="flex items-center gap-2">
                <IoCheckmarkCircleSharp color="#2563eb" /> Colors pelette
              </div>
              <div className="flex items-center gap-2">
                <IoCheckmarkCircleSharp color="#2563eb" /> Hover Animations
              </div>
              <div className="flex items-center gap-2">
                <IoCheckmarkCircleSharp color="#2563eb" /> Stadistics
              </div>
              <div className="flex items-center gap-2">
                <IoCheckmarkCircleSharp color="#2563eb" /> No free trial{" "}
              </div>
              <div className="flex items-center gap-2">
                <IoCheckmarkCircleSharp color="#2563eb" /> No watermark
              </div>
            </div>
          </div>
        </section>
      </div>
      <ModalUI text="Get Discount Now" size="lg"/>
    </section>
  );
}

export default Pricing;
