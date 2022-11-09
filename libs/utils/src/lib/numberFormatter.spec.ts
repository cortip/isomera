import { numberFormatter } from './numberFormatter';

describe('numberFormatter', () => {
  it('should convert 10 to 10', () => {
    expect(numberFormatter(10)).toEqual('10');
  });

  it('should convert 5 to 5', () => {
    expect(numberFormatter(5)).toEqual('5');
  });

  it('should convert 100 to 100', () => {
    expect(numberFormatter(100)).toEqual('100');
  });

  it('should convert 1000 to 1k', () => {
    expect(numberFormatter(1000)).toEqual('1k');
  });

  it('should convert 1247 to 1.247k', () => {
    expect(numberFormatter(1247, 3)).toEqual('1.247k');
  });

  it('should convert 1247 to 1.2k', () => {
    expect(numberFormatter(1247, 1)).toEqual('1.2k');
  });

  it('should convert 1247 to rounded 1.25k', () => {
    expect(numberFormatter(1247, 2)).toEqual('1.25k');
  });
});
