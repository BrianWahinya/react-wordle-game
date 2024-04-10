import { genRandomId } from "../../helpers/utils";
import Row from "./Row";
import "./css/rows.css";

const fillEmptyRows = (amount) => {
  const emptyRows = [];
  for (let i = 0; i < amount; i++) {
    emptyRows.push("");
  }
  return emptyRows;
};

const Rows = ({ words, target }) => {
  const options = target.length + 1;

  return (
    <div>
      {words.map((word) => (
        <Row key={genRandomId()} text={word} target={target} />
      ))}

      {fillEmptyRows(options - (words.length || 0)).map((_) => (
        <Row key={genRandomId()} text={""} target={target} />
      ))}
    </div>
  );
};
export default Rows;
