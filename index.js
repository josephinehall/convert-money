module.exports = function (decimalValues, imperialValues, currencyType) {
  var decimalValues = decimalValues || [];
  var imperialValues = imperialValues || [];
  var currencyType = currencyType || 'imperial';
  var sum;

  //sum the decimal values, and convert them to decimal
  for (var i = 0; i < decimalValues.length; i++) {
    sum = sum + decimalValues[i];
  }

  return sum;

  //sum imperial values and convert them to decimal

  //sum decimal and imperial values, and return them to decimal

  //sum decimal values and return them to imperial

  //sum imperial values and return them as imperial.

  //sum decimal and imperial and return as imperial.

}
