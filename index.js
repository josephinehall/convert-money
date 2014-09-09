"use strict";

module.exports = {
  /**
   * Sum arrays of decimal values and imperial values, return as a decimal value
   * @param  {Array} decimalValues
   * @param  {Array} imperialValues
   * @return {int}
   */
  sumToDecimal: function(decimalValues, imperialValues) {
    var imperialSum = 0;
    if (imperialValues)
      imperialSum = this.sumImperial(imperialValues);
    return this.convertToDecimal(imperialSum) + this.sumDecimal(decimalValues);
  },

  /**
   * Sum arrays of decimal values and imperial values, return as an imperial value
   * @param  {Array} decimalValues
   * @param  {Array} imperialValues
   * @return {Array}
   */
  sumToImperial: function(decimalValues, imperialValues) {
    var decimalSum = this.sumDecimal(decimalValues);
    var decimalSumAsImperial = this.convertToImperial(decimalSum);
    //push each of the imperial-converted decimal amounts on to the array of imperial values
    if (!imperialValues)
      imperialValues = [];
    for (var i = 0; i < decimalSumAsImperial.length; i++) {
      imperialValues.push(decimalSumAsImperial[i]);
    }
    return this.sumImperial(imperialValues);
  },

  /**
    Sum an array of decimal values and return as a decimal value
    @param {Array} decimalValues
    @return {int} sum
  **/
  sumDecimal: function(decimalValues) {
    var sum = 0;
    if (decimalValues){
      for (var i = 0; i < decimalValues.length; i++) {
        sum += parseInt(decimalValues[i]);
      }
    }
    return sum;
  },

  /**
    Sum an array of imperial values and return as an imperial value
    @param {Array} imperialValues
    @return {Array} sum
  **/
  sumImperial: function(imperialValues) {
    var pounds,
        shillings,
        pence,
        sum = [];
    //calculate the total value of the imperialValues in pence
    pence = this.convertToPence(imperialValues);
    //then convert to that amount to pounds shillings and pence
    pounds = Math.floor(pence / 240);
    pence %= 240;

    shillings = Math.floor(pence / 12);
    pence %= 12;

    if (pounds > 0)
      sum.push(pounds + ' pounds');
    if (shillings > 0)
      sum.push(shillings + ' shillings');
    if (pence > 0)
      sum.push(pence + ' pence');
    return sum;
  },

  /**
    Convert an array of imperial values into the total in decimal currency - in cents
    @param {Array} values
    @return {int} result, in cents
  **/
  convertToDecimal: function(values) {
    var pounds = 0,
        shillings = 0,
        pence= 0,
        result = 0,
        remainder = 0;

    if (values){
      for (var i = 0; i < values.length; i++){
        pounds += this.findPoundValue(values[i]);
        shillings += this.findShillingsValue(values[i]);
        pence += this.findPenceValue(values[i]);
      }
    }

    result = pounds * 200;
    result += shillings * 10;

    if (pence >= 12){
      remainder = pence % 12;
      result += ((pence - remainder) / 12) * 10;
      result += this.convertPenceToCents(remainder);
    } else {
      result += this.convertPenceToCents(pence);
    }
    return result;
  },

  /**
    Convert a decimal amount in cents into the equivalent imperial amount
    @param {int} amount
    @return {Array} result, in imperial
  **/
  convertToImperial: function(amount) {
    var pounds,
        shillings,
        pence,
        result = [];

    pounds = Math.floor(amount / 200);
    amount -= pounds * 200;
    shillings = Math.floor(amount / 10);
    amount -= shillings * 10;
    pence = this.convertCentsToPence(amount);

    if (pounds > 0)
      result.push(pounds + ' pounds');
    if (shillings > 0)
      result.push(shillings + ' shillings');
    if (pence > 0)
      result.push(pence + ' pence');
    return result;
  },

  /**
    Convert an array of imperial values into the total in pence
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
    if (values){
      for (var i = 0; i < values.length; i++){
        pounds += this.findPoundValue(values[i]);
        shillings += this.findShillingsValue(values[i]);
        pence += this.findPenceValue(values[i]);
      }
    }
    pounds *= 240;
    shillings *= 12;
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
