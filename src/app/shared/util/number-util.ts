/**
 * Created by Keerthikan on 07-May-17.
 */

export class NumberUtil {
  public static convertStringToNumber(value: string, defaultValue = 0) {
    const parsedNumber = parseFloat(value);
    return isNaN(parsedNumber) ? defaultValue : parsedNumber;
  }
}
