import {AmountFormatPipe} from "./amount-format.pipe";

describe('AmountFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new AmountFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
