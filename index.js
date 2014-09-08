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
    var pence = convertToPence(imperialValues);
    //then convert to that amount to pounds shillings and pence
    var pounds = pence / 240;
    pence = pence % 240;

    var shillings = pence / 12;
    pence = pence % 12;

    var result = [];
    result.push(pounds + 'pounds');
    result.push(shillings + 'shillings');
    result.push(pence + 'pence');
    return result;
  },

  //TODO convert an imperial amount to decimal equivalent
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

    result = pounds * 2;
    result += (shillings * 0.1);

    if (pence >= 10){
      remainder = pence % 10;
      pence = (pence - remainder) * 0.01;
      result += pence;
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
    @return {object} sum
  **/
  convertToPence: function(values) {
    var sum = 0,
        pence = 0,
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
        return 0.01;
      case 2:
      case 3:
        return 0.02;
      case 4:
        return 0.03;
      case 5:
        return 0.04;
      case 6:
        return 0.05;
      case 7:
        return 0.06;
      case 8:
        return 0.07;
      case 9:
      case 10:
        return 0.08;
      case 11:
        return 0.09;
      default:
        return 0;
    }
  }

};
