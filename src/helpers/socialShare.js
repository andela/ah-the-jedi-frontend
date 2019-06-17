import { APP_URL } from '../redux/constants';

export const twitterUrl = (slug, title) => {
  const articleUrl = `${APP_URL}articles/${slug}/`;
  return `https://twitter.com/share?url=${articleUrl}&amp;text=Checkout this article at Author's Haven on ${title}`;
};

export const facebookUrl = (slug, title) => {
  const articleUrl = `${APP_URL}articles/${slug}/`;
  return `http://www.facebook.com/sharer.php?u=${articleUrl}&quote=Checkout this article at Author's Haven on ${title}`;
};

export const mailUrl = (slug, title) => {
  const articleUrl = `${APP_URL}articles/${slug}/`;
  return `mailto: ?subject =Checkout this article at Author's Haven on ${title} read&body=${articleUrl}`;
};
