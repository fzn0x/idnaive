## Idnaive

![idnaive - A Simple Node.js Naive Bayes Library](./Idnaive.png)

**Idnaive** is A Simple Node.js Naive Bayes Library.

✅ Multilanguage Stemming (Indonesia + English)\
✅ Out String Filter\
✅ Punctuation Filter

## Installation

```bash
npm install idnaive
```

### Usage

```js
const NaiveBayes = require("idnaive");

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
```

#### Datasets example :

| Data        | Label   |
| ----------- | ------- |
| Hello World | Inggris |
| Hello World | Inggris |
| Hello World | Arab    |
| Kun Fayakun | Arab    |

**Input Data** : Aku suka makan hello world

#### Calculation

<!-- using js to highlight P and numbers  -->

```js
Label | Inggris = 2/4
Label | Arab = 2/4

Hello World | Inggris = 2/2
Hello World | Arab = 1/2

P | Inggris = 2/4 x 2/2 = 0.5
P | Arab = 2/4 X 1/2 = 0.25
```

### Parameters

- **new NaiveBayes(languageCode)**
  - languageCode: languageCode determines what language used for stemming by the language code. currently **idnaive** supports `id (Indonesia)` and `en (English)`.

### License

**Idnaive** licensed by [MIT License](./LICENSE.md)

### Credits

Credits to their amazing open source:

- [porter-stemmer](https://github.com/jedp/porter-stemmer)
- [akarata](https://github.com/ikhsanalatsary/akarata)
