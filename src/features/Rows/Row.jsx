import { useState } from "react";
import Cell from "./Cell";
import { genRandomId } from "../../helpers/utils";

const Row = ({ text, target }) => {
  return (
    <div className="row">
      {String(text)
        .padEnd(target.length, " ")
        .split("")
        .map((item) => (
          <Cell key={genRandomId()} char={item} />
        ))}
    </div>
  );
};
export default Row;
