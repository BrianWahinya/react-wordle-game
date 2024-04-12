import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { genRandomInt } from "../helpers/utils.js";
import { useGameCtx } from "../context/GameContext.jsx";
import { getWordsByLevel } from "../api/methods.js";

const useWordle = () => {
  const { target, level, changeTarget } = useGameCtx();

  const { isPending, error, data, isFetching, refetch } = useQuery({
    queryKey: ["targetData", level],
    queryFn: () => getWordsByLevel(level),
  });
  // console.log(data);

  const fetchData = (e) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (data && !isFetching && !isPending) {
      const availableWords = data.words;
      const randomIdx = genRandomInt(0, availableWords.length);
      console.log(availableWords[randomIdx]);
      changeTarget(availableWords[randomIdx]);
    }
  }, [isPending, isFetching, data]);

  return {
    isFetching,
    isPending,
    error,
    data,
    target,
    fetchData,
  };
};
export default useWordle;
