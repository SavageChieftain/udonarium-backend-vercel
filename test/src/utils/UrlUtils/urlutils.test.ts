import { isAllowedOrigin } from '../../../../src/utils/UrlUtils';

describe('UrlUtils.isAllowedOrigin', () => {
  it('allows wildcard', () => {
    expect(isAllowedOrigin('https://example.com', ['*'])).toBe(true);
  });

  it('returns false for invalid origin', () => {
    expect(isAllowedOrigin('not a url', ['https://example.com'])).toBe(false);
  });

  it('matches same origin', () => {
    expect(isAllowedOrigin('https://example.com', ['https://example.com'])).toBe(true);
  });

  it('does not match different host', () => {
    expect(isAllowedOrigin('https://evil.com', ['https://example.com'])).toBe(false);
  });
});
