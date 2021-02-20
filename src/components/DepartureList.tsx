import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { Departure as DepartureType } from "../types";
import { formatDate } from "../utils";
import Departure from "./Departure";
import "./DepartureList.css";

const container = {
  hidden: {
    transition: {
      staggerChildren: 0.075,
    },
  },
  show: {
    transition: {
      staggerChildren: 0.075,
    },
  },
};

const listItem = {
  hidden: { x: -5, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

export default function DepartureList({
  departures,
  resultDate,
}: {
  departures: DepartureType[];
  resultDate: string;
}) {
  return (
    <div className="departure-list">
      <p className="results-title" key="title">
        Showing Results for <strong>{formatDate(resultDate)}</strong>
      </p>
      <AnimatePresence>
        <motion.ul
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={container}
        >
          {departures.map((departure) => (
            <motion.div key={departure.id} variants={listItem}>
              <Departure {...departure} />
            </motion.div>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

export function AnimatedChild({
  showing,
  children,
}: {
  showing: boolean;
  children: ReactNode;
}) {
  return showing ? (
    <motion.div
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={listItem}
    >
      {children}
    </motion.div>
  ) : null;
}
