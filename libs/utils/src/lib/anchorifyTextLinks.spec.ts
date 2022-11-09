import { anchorifyTextLinks } from './anchorifyTextLinks';

describe('anchorifyTextLinks', () => {
  it('should convert link plain text to text with html link', () => {
    expect(
      anchorifyTextLinks(
        'This is a link to google https://www.google.com. Please enjoy.'
      )
    ).toEqual(
      'This is a link to google <a href="https://www.google.com" target="_blank">https://www.google.com</a>. Please enjoy.'
    );
  });

  it('should convert multiple links in plain text to text with html links', () => {
    expect(
      anchorifyTextLinks(
        'This is a link to google https://www.google.com. Please enjoy. And https://www.cortip.com might be helpful too.'
      )
    ).toEqual(
      'This is a link to google <a href="https://www.google.com" target="_blank">https://www.google.com</a>. Please enjoy. And <a href="https://www.cortip.com" target="_blank">https://www.cortip.com</a> might be helpful too.'
    );
  });

  it('should do nothing if link not found', () => {
    expect(anchorifyTextLinks('Simple text')).toEqual('Simple text');
  });
});
