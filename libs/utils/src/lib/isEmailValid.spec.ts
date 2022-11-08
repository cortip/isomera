import { isEmailValidCheck } from './isEmailValid';

describe('isEmailValidCheck', () => {
  it('should work with good email', () => {
    expect(isEmailValidCheck('john.doe@test.com')).toBeTruthy();
  });

  it('should be false for not email', () => {
    expect(isEmailValidCheck('John')).toBeFalsy();
  });
});
