const NaiveBayes = require("./src/naive-bayes.js");

const naiveBayes = new NaiveBayes("en");

const datasets = [
  ["You're doing good and expressive", "positive"],
  ["You're doing wow and nice", "positive"],
  ["What is this? very waste of time, and bad", "negative"],
];

naiveBayes.learn(...datasets);

let result = naiveBayes.classify(
  "This is bad, and you should try better because it waste my time"
);
console.log(result);
