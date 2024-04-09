export function formatDecimalNumber(number: number | string) {
  const str = number.toString();
  const length = str.length;

  if (length < 3 || length <= 3) {
    return str + ".0";
  } else if (length === 4) {
    return str.slice(0, length - 1) + "." + str.slice(length - 1);
  } else {
    return str.slice(0, length - 2) + "." + str.slice(length - 2);
  }
}
