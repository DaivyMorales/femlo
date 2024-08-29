import {
  Amazon,
  Femlo,
  GitHub,
  LemonSqueezy,
  ProductHunt,
  Spotify,
  Uber,
} from "@/components/svgs";
import React, { useState } from "react";
import { motion } from "framer-motion";
import InputSearch from "@/components/InputSearch";

const DEFAULTS_COLUMNS = [
  { id: "a" },
  { id: "b" },
  { id: "c" },
  { id: "d" },
  { id: "e" },
];

const DEFAULT_CARDS = [
  { id: 1, component: Amazon, column: "a", size: 80 },
  { id: 2, component: Femlo, column: "b", size: 50 },
  { id: 3, component: Uber, column: "c", size: 70 },
  { id: 4, component: GitHub, column: "d", size: 70 },
  { id: 5, component: LemonSqueezy, column: "e", size: 100 },
];

function Create() {
  const [cards] = useState(DEFAULT_CARDS);
  const [columns] = useState(DEFAULTS_COLUMNS);

  const cardsByColumn = columns.map(({ id }) => ({
    id,
    cards: cards.filter((card) => card.column === id),
  }));

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex items-center gap-6">
          {cardsByColumn.map(({ id, cards }) => (
            <div className="h-[80px] w-[130px] rounded-xl border-[1px] border-dashed border-neutral-200 bg-neutral-50 shadow-sm"></div>
            //   <div key={id} className="flex flex-col items-center gap-2">
            //     {cards.map(({ id, component: Component, size, column }) => (
            //       <Card id={id} component={Component} size={size} column={column} />
            //     ))}
            //   </div>
          ))}
        </div>
        <InputSearch/>
      </div>
      
    </div>
  );
}

type CardProps = {
  id: number;
  component: React.ElementType;
  size: number;
  column: string;
};

const Card: React.FC<CardProps> = ({
  id,
  component: Component,
  size,
  column,
}) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <DropIndicator beforeId="-1" column={column} />
      <motion.div key={id} className="cursor-pointer" draggable>
        <Component className="fill-neutral-600" style={{ fontSize: size }} />
      </motion.div>
    </div>
  );
};

const DropIndicator = ({ beforeId, column }: any) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="h-[50px] w-[3px] rounded-full bg-blue-400 opacity-0"
    ></div>
  );
};

export default Create;
