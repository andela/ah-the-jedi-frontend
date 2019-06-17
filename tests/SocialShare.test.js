import { twitterUrl, facebookUrl, mailUrl } from '../src/helpers/socialShare';
import { APP_URL } from '../src/redux/constants';

describe('Unit tests for social share urls', () => {
  const title = 'test';
  const slug = 'test';
  const articleUrl = `${APP_URL}articles/test/`;

  it('returns sharable facebook url', () => {
    const expectedUrl = `http://www.facebook.com/sharer.php?u=${articleUrl}&quote=Checkout this article at Author's Haven on ${title}`;
    const returnedUrl = facebookUrl(slug, title);
    expect(returnedUrl).toEqual(expectedUrl);
  });

  it('returns sharable twitter url', () => {
    const expectedUrl = `https://twitter.com/share?url=${articleUrl}&amp;text=Checkout this article at Author's Haven on ${title}`;
    const returnedUrl = twitterUrl(slug, title);
    expect(returnedUrl).toEqual(expectedUrl);
  });

  it('returns sharable mail url', () => {
    const expectedUrl = `mailto: ?subject =Checkout this article at Author's Haven on ${title} read&body=${articleUrl}`;
    const returnedUrl = mailUrl(slug, title);
    expect(returnedUrl).toEqual(expectedUrl);
  });
});
