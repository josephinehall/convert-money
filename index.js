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
    int pence = convertToPence(imperialValues);

    int pounds = pence / 240;
    pence = pence % 240;

    int shillings = pence / 12;
    pence = pence % 12;

    var total = {
      pounds: pounds,
      shillings: shillings,
      pence: pence
    };

    return = total;
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
  },

  convertToPence: function(values) {
    var pence = 0;
    //go through the array,
    //pick out all the pounds. Multiply by 240
    //pick out all the shillings. Multiply by 12
    //add all the leftover pence to this number
    //should then have the total in pence.
    for (var i = 0; i < values.length; i++){

    }
    return pence;
  }

};
