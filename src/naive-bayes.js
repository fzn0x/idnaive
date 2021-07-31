const { enStem, idStem } = require("../lib/stemmer");

class NaiveBayes {
  constructor(languageCode) {
    this.languageCode = languageCode;
    this.wordsData = {};
    this.labels = {};
    this.frequencyCount = {};
  }

  _init(data, label) {
    if (!this.wordsData[data]) {
      this.wordsData[data] = {};
    }
    if (!this.wordsData[data][label]) {
      this.wordsData[data][label] = 0;

      if (!this.labels[label]) {
        this.labels[label] = 0;
      }

      if (!this.frequencyCount[label]) {
        this.frequencyCount[label] = {};
      }
    }
  }

  learn(...args) {
    args.forEach((value) => {
      let data = this._stem(value[0]);
      let label = value.pop();
      this._init(data, label);

      this.wordsData[data][label]++;
      this.labels[label]++;

      let tokenizer = this._filter(data);

      tokenizer.forEach((word) => {
        let frequencyTable = this._frequencyTable(tokenizer);

        if (!this.frequencyCount[label][word]) {
          this.frequencyCount[label][word] = frequencyTable[word];
        } else {
          this.frequencyCount[label][word] += frequencyTable[word];
        }
      });
    });
  }

  classify(data) {
    let filteredData = this._filter(data);
    let result = this._findProbability(filteredData);
    return result;
  }

  _stem(str) {
    switch (this.languageCode) {
      case "en":
        return enStem(str);
        break;
      case "id":
        return idStem(str);
        break;
      default:
        return enStem(str);
        break;
    }
  }

  _filter(str) {
    let stemmed = this._stem(str);
    let outString = stemmed.replace(
      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
      ""
    );
    let punctuation = /[^(a-zA-ZA-Яa-я0-9_)+\s]/g;
    let sanitizedWord = outString.replace(punctuation, " ");
    return sanitizedWord.split(/\s+/);
  }

  _findProbability(filteredData) {
    let self = this;
    let maxProbability = -Infinity;
    let chosenLabel = null;

    let frequencyTable = self._frequencyTable(filteredData);

    Object.keys(self.labels).forEach(function (label) {
      let labelProbability =
        self.labels[label] / Object.keys(self.wordsData).length;

      let lastProbability = Math.log(labelProbability);

      Object.keys(frequencyTable).forEach(function (word) {
        let frequencyInText = frequencyTable[word];
        let wordProbability = self._wordProbability(word, label);

        lastProbability += frequencyInText * Math.log(wordProbability);
      });

      if (lastProbability > maxProbability) {
        maxProbability = lastProbability;
        chosenLabel = label;
      }
    });

    return chosenLabel;
  }

  _wordProbability(word, label) {
    let frequencyCount = this.frequencyCount[label][word] || 0;
    let wordCount = this.labels[label];
    return (
      (frequencyCount + 1) / (wordCount + Object.keys(this.wordsData).length)
    );
  }

  _frequencyTable(words) {
    let frequencyTable = {};
    words.forEach(function (word) {
      if (!frequencyTable[word]) frequencyTable[word] = 1;
      else frequencyTable[word]++;
    });
    return frequencyTable;
  }
}

module.exports = NaiveBayes;
