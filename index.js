module.exports = {
  /**
   * Sum arrays of decimal values and imperial values, return as a decimal value
   *
   * @param  {Array} decimalValues
   * @param  {Array} imperialValues
   * @return {int}
   */
  sumToDecimal: function(decimalValues, imperialValues) {
    var decimalSum = sumDecimal(decimalValues);
    var imperialSum = sumImperial(imperialValues);

    return decimalSum + convertToDecimal(imperialSum);
  },

  /**
   * Sum arrays of decimal values and imperial values, return as an imperial value
   *
   * @param  {Array} decimalValues
   * @param  {Array} imperialValues
   * @return {int}
   */
  sumToImperial: function(decimalValues, imperialValues) {
    var sum = 0;
    var decimalSum = sumDecimal(decimalValues);
    var imperialSum = sumImperial(imperialValues);
    imperialSum = sumImperial(imperialSum, convertToImperial(decimalSum));
    return imperialSum;
  },

  sumDecimal: function(decimalValues) {
    var sum = 0;
    for (var i = 0; i < decimalValues.length; i++) {
      sum = sum + decimalValues[i];
    }
    return sum;
  },

  sumImperial: function(imperialValues) {
    var pence = sumPence(imperialValues);
    var shillings = sumShillings(imperialValues);
    var pounds = sumPounds(imperialValues);

    //sum up all the imperial values from the param

    // int pounds = pence / 240;
    // pence = pence % 240;

    // int shillings = pence / 12;
    // pence = pence % 12;

    return new int[]{ pounds, shillings, pence };
  },

  //convert the imperial amount to decimal equivalent
  convertToDecimal: function(imperial) {
    var imperial = 0;
    return imperial;
  },

  //convert the decimal sum to the imperial equivalent
  convertToImperial: function(decimal) {
    var sum = 0;
    return sum;
  }

};
