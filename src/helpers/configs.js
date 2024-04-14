const storedData = JSON.parse(localStorage.getItem("wordle-game"));

const configs = {
  lang: "en",
  theme: "light",
  activeLevel: storedData?.level || "basic",
  api: {
    levels: {
      basic: "data/basic.json",
      intermediate: "data/intermediate.json",
      expert: "data/expert.json",
      legendary: "data/legendary.json",
    },
  },
};

export default configs;
