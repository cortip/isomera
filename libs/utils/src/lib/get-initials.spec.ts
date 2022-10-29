import { getInitials } from './get-initials';

describe('get-initials', () => {
  it('should work for first and last name', () => {
    expect(getInitials('John Doe')).toEqual('JD');
  });

  it('should work for first name', () => {
    expect(getInitials('John')).toEqual('J');
  });

  it('should work for first two words in a name', () => {
    expect(getInitials('John Doe The Third')).toEqual('JD');
  });
});
