import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { genRandomInt } from "../helpers/utils.js";
import { useGameCtx } from "../context/GameContext.jsx";

// const target = "example";

const useWordle = () => {
  const { target, changeTarget } = useGameCtx();

  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["targetData"],
    queryFn: () =>
      axios
        .get("https://api.datamuse.com/words?sp=*t??k")
        .then((res) => res.data),
    // enabled: false,
  });
  // console.log(data);

  const fetchData = (e) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (data && !isFetching && !isPending) {
      const randomIdx = genRandomInt(0, data.length);
      // console.log(data[randomIdx].word);
      changeTarget(data[randomIdx].word);
    }
  }, [isPending, isFetching, data]);

  return { isFetching, isPending, error, data, target, fetchData };
};
export default useWordle;
