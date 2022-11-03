import { render } from '@testing-library/react';

import Interfaces from './interfaces';

describe('Interfaces', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Interfaces />);
    expect(baseElement).toBeTruthy();
  });
});
