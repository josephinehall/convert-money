module.exports = {
  /**
   * Sum arrays of decimal values and imperial values, return as a decimal value
   *
   * @param  {Array} decimalValues
   * @param  {Array} imperialValues
   * @return {int}
   */
  sumToDecimal: function(decimalValues, imperialValues) {
    var decimalSum = this.sumDecimal(decimalValues);
    var imperialSum = this.sumImperial(imperialValues);
    return decimalSum + this.convertToDecimal(imperialSum);
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
    var decimalSum = this.sumDecimal(decimalValues);
    //convert the decimal sum to an imperial value
    var decimalAsImperial = this.convertToImperial(decimalSum);
    //push it on to the array of imperial values
    imperialValues.push(decimalAsImperial);
    //sum up all the imperial values and return.
    return this.sumImperial(imperialValues);
  },

  /**
    Sum an array of decimal values and return as a decimal value

    @param {Array} decimalValues
    @return {int}
  **/
  sumDecimal: function(decimalValues) {
    var sum = 0;
    for (var i = 0; i < decimalValues.length; i++) {
      sum = sum + parseInt(decimalValues[i]);
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
    var pence = this.convertToPence(imperialValues);
    //then convert to that amount to pounds shillings and pence
    var pounds = Math.floor(pence / 240);
    pence = pence % 240;

    var shillings = Math.floor(pence / 12);
    pence = pence % 12;

    var result = [];
    result.push(pounds + 'pounds');
    result.push(shillings + 'shillings');
    result.push(pence + 'pence');
    return result;
  },

  /**
    Convert an array of imperial values into the sum total in decimal currency - total cents
    @param {Array} values
    @return {int} result, in cents
  **/
  convertToDecimal: function(values) {
    var pounds = 0,
        shillings = 0,
        pence = 0,
        result = 0,
        cents = 0,
        remainder = 0;

    for (var i = 0; i < values.length; i++){
      pounds += this.findPoundValue(values[i]);
      shillings += this.findShillingsValue(values[i]);
      pence += this.findPenceValue(values[i]);
    }

    result = pounds * 200;
    result += (shillings * 10);

    if (pence >= 10){
      remainder = pence % 10;
      result += (pence - remainder);
      result += this.convertPenceToCents(remainder);
    } else {
      result += this.convertPenceToCents(pence);
    }
    return result;
  },

  //TODO convert a decimal amount to the imperial equivalent
  convertToImperial: function(amount) {
    var result = 0;
    return result;
  },

  /**
    Convert an array of imperial values into the sum total in pence
      - sum all the pounds together and multiply by 240
      - sum all the shillings together and multiply by 12
      - sum all the pence
      - add each of these together and return it.

    @param {Array} values
    @return {int} sum
  **/
  convertToPence: function(values) {
    var pence = 0,
        pounds = 0,
        shillings = 0;
    for (var i = 0; i < values.length; i++){
      pounds += this.findPoundValue(values[i]);
      shillings += this.findShillingsValue(values[i]);
      pence += this.findPenceValue(values[i]);
    }
    pounds = pounds * 240;
    shillings = shillings * 12;
    return pounds + shillings + pence;
  },

  findPoundValue: function(string) {
    if ((/\u00a3|pound|pounds/).test(string)) {
      var value = string.split(/\u00a3|pound|pounds/)[0];
      return parseInt(value);
    }
    return 0;
  },

  findShillingsValue: function(string) {
    if ((/shilling|shillings/).test(string)){
      var value = string.split(/shilling|shillings/)[0];
      return parseInt(value);
    }
    return 0;
  },

  findPenceValue: function(string) {
    if ((/penny|pence|pennies/).test(string)){
      var value = string.split(/penny|pence|pennies/)[0];
      return parseInt(value);
    }
    return 0;
  },

  convertPenceToCents: function(value) {
    switch (value){
      case 1:
        return 1;
      case 2:
      case 3:
        return 2;
      case 4:
        return 3;
      case 5:
        return 4;
      case 6:
        return 5;
      case 7:
        return 6;
      case 8:
        return 7;
      case 9:
      case 10:
        return 8;
      case 11:
        return 9;
      default:
        return 0;
    }
  },

  convertCentsToPence: function(value){
    switch (value){
      case 1:
        return 1;
      case 2:
        return 3;
      case 3:
        return 4;
      case 4:
        return 5;
      case 5:
        return 6;
      case 6:
        return 7;
      case 7:
        return 8;
      case 8:
        return 10;
      case 9:
        return 11;
      default:
        return 0;
    }
  }

};
