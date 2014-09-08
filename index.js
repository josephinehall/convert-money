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
    //sum the decimal values
    var decimalSum = sumDecimal(decimalValues);
    //convert the decimal sum to an imperial value
    var decimalAsImperial = convertToImperial(decimalSum);
    //push it on to the array of imperial values
    imperialValues.push(decimalAsImperial);
    //sum up all the imperial values and return.
    return sumImperial(imperialValues);
  },

  /**
    Sum an array of decimal values and return as a decimal value

    @param {Array} decimalValues
    @return {int}
  **/
  sumDecimal: function(decimalValues) {
    var sum = 0;
    for (var i = 0; i < decimalValues.length; i++) {
      sum = sum + decimalValues[i];
    }
    return sum;
  },

  /**
    Sum an array of imperial values and return as an imperial value

    @param {Array} imperialValues
    @return {object} sum
  **/
  sumImperial: function(imperialValues) {
    //calculate the total value of the imperialValues in pence
    int pence = convertToPence(imperialValues);
    //then convert to that amount to pounds shillings and pence
    int pounds = pence / 240;
    pence = pence % 240;

    int shillings = pence / 12;
    pence = pence % 12;

    var sum = {
      pounds: pounds,
      shillings: shillings,
      pence: pence
    };

    return sum;
  },

  //TODO convert the imperial amount to decimal equivalent
  convertToDecimal: function(amount) {
    var result = 0;
    return result;
  },

  //TODO convert the decimal sum to the imperial equivalent
  convertToImperial: function(amount) {
    var result = 0;
    return result;
  },

  /**
    Convert an array of imperial values into the sum total in pence
      - sum all the pounds together and multiply by 240
      - sum all the shillings together and multiply by 12
      - sum all the pence
      - add each of these together and return the sum,=.

    @param {Array} values
    @return {object} sum
  **/
  convertToPence: function(values) {
    var sum = 0,
        pence = 0,
        pounds = 0,
        shillings = 0;
    for (var i = 0; i < values.length; i++){
      pounds += findPoundValue(values[i]);
      shillings += findShillingsValue(values[i]);
      pence += findPenceValue(values[i]);
    }
    pounds = pounds * 240;
    shillings = shillings * 12;
    return pounds + shillings + pence;
  },

  findPoundValue: function(string){
    if ((/\u00a3|pound|pounds/).test(string)){
      return string.split(/\u00a3|pound|pounds/)[0];
    }
    return 0;
  },

  findShillingsValue: function(string){
    if ((/d|d.|shilling|shillings/).test(string)){
      return string.split(/d|d.|shilling|shillings/)[0];
    }
    return 0;
  },

  findPenceValue: function(string){
    if ((/s|s.|penny|pence|pennies/).test(string)){
      return string.split(/s|s.|penny|pence|pennies/)[0];
    }
    return 0;
  }

};
