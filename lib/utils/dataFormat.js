/// number to KB, MB, GB, TB

export const num2DataSize = (value, precision=0) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  var myLabel = [];
  let formattedValue = value;
  let unitIndex = 0;
  while (formattedValue >= 1024 && unitIndex < units.length - 1) {
    formattedValue /= 1024;
    unitIndex++;
  }
  formattedValue = formattedValue.toFixed(precision).toLocaleString("en-US").replaceAll(",", " ");
  myLabel.push (formattedValue + ' ' + units[unitIndex] + '');

  return myLabel;
}

