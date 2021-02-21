import { motion } from "framer-motion";
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
  hidden: { x: -10, opacity: 0 },
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
    </div>
  );
}
