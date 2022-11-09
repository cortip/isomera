import { newLineToHTMLBR } from './newLineToHTMLBR';

describe('newLineToHTMLBR', () => {
  it('should work with text with multiple lines', () => {
    expect(
      newLineToHTMLBR(`Hello
how is it going?`)
    ).toEqual('Hello<br />how is it going?');
  });

  it('should be same with text in one line', () => {
    expect(newLineToHTMLBR('John')).toEqual('John');
  });
});
