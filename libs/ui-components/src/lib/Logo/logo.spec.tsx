import { render } from '@testing-library/react';
import { Logo } from './logo';

describe('Logo component', () => {
  it('should render successfully with default props', () => {
    const { baseElement } = render(<Logo />);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully with light variant', () => {
    const { baseElement } = render(<Logo isLight={true} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully with badge variant', () => {
    const { baseElement } = render(<Logo isLight={true} />);
    expect(baseElement).toBeTruthy();
  });
});
