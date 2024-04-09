import { genRandomId } from "../../helpers/utils";
import Row from "./Row";
import "./css/rows.css";

const Rows = ({ words, target }) => {
  return (
    <div>
      {words.map((word) => (
        <Row key={genRandomId()} text={word} target={target} />
      ))}
    </div>
  );
};
export default Rows;
