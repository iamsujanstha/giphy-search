/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './gifDeailView.module.scss';
import Tag from '@/components/tag/Tag';
import { Icons } from '@/utils/iconConfig';
import { copyToClipboard } from '@/utils/copyToClipboard';
import useDrawer from '@/hooks/useTopDrawer';
import MessageDrawer from '@/components/drawer/message-drawer/MessageDrawer';

const GifDetailView = () => {
  const location = useLocation();
  const gifData = location.state?.gifData;
  const [isExpanded, setIsExpanded] = useState(false);
  const [favourite, setFavourite] = useState<string[]>([]);
  const [isShare, setShare] = useState(false);

  const { isDrawerOpen, drawerContent, openDrawer } = useDrawer();

  useEffect(() => {
    if (gifData) {
      // Dynamically set meta tags for sharing
      document.title = `${gifData.title} | GIF Detail`;
    }
  }, [gifData]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFavorite = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavourite((prev) =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const handleShare = () => {
    setShare(true);
  };

  const handleCloseShare = () => {
    setShare(false);
  };

  const handleCopy = (url: string) => async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(url);
    if (success) {
      openDrawer("Link copied to Clipboard.");
    }
  };

  const getShareLink = (platform: string, url: string, text: string, media?: string) => {
    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      case 'pinterest':
        return `https://pinterest.com/pin/create/button/?url=${url}&media=${media || url}&description=${text}`;
      case 'reddit':
        return `https://www.reddit.com/submit?url=${url}&title=${text}`;
      default:
        return '';
    }
  };

  if (!gifData) {
    return <p>No GIF data available.</p>;
  }

  const visibleTags = isExpanded ? gifData?.tags : gifData?.tags.slice(0, 5);
  const gifUrl = gifData.images.fixed_width.url;
  const gifTitle = gifData.title;

  return (
    <div className={styles.container}>
      {/* Meta tags for social sharing */}
      <Helmet>
        <meta property="og:title" content={gifTitle} />
        <meta property="og:description" content={`Check out this GIF: ${gifTitle}`} />
        <meta property="og:image" content={gifUrl} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={gifTitle} />
        <meta name="twitter:image" content={gifUrl} />
      </Helmet>

      <div className={styles.gifDetail}>
        <div className={styles.imgContainer}>
          <picture>
            <source srcSet={gifData.images.fixed_width.webp} type="image/webp" />
            <source srcSet={gifData.images.fixed_width.url} type="image/jpeg" />
            <img src={gifData.images.fixed_width.url} alt={gifData.title} />
          </picture>
          <span className={styles.iconContainer}>
            <span onClick={handleFavorite(gifData.id)}>
              <Icons.favouriteIcon
                size="28"
                color={favourite.find((id) => id === gifData.id) ? 'red' : ''}
              />
              Favourite
            </span>
            <span onClick={handleShare}>
              <Icons.shareIcon size="28" /> Share
            </span>
          </span>
          {isShare && (
            <div className={styles.overlay}>
              <h3>Share Gif</h3>
              <span className={styles.closeBtn} onClick={handleCloseShare}>
                <Icons.closeIcon size="34" />
              </span>
              <div className={styles.shareContainer}>
                <div className={styles.icons}>
                  <a href={getShareLink('facebook', gifUrl, gifTitle)} target="_blank" rel="noopener noreferrer">
                    <Icons.socialIcons.fbIcon size="55" />
                  </a>
                  <a href={getShareLink('pinterest', gifUrl, gifTitle, gifUrl)} target="_blank" rel="noopener noreferrer">
                    <Icons.socialIcons.pinterestIcon size="55" />
                  </a>
                  <a href={getShareLink('reddit', gifUrl, gifTitle)} target="_blank" rel="noopener noreferrer">
                    <Icons.socialIcons.redditIcon size="55" />
                  </a>
                  <a href={getShareLink('twitter', gifUrl, gifTitle)} target="_blank" rel="noopener noreferrer">
                    <Icons.socialIcons.twitterIcon size="55" />
                  </a>
                </div>
                <button onClick={handleCopy(gifUrl)}>
                  <Icons.linkIcon size="14" />
                  <span>Copy Gif Link</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.tags}>
          {visibleTags?.map((tag: any) => (
            <Tag name={tag} key={tag} />
          ))}
          {!isExpanded && (
            <span className={styles.moreTag} onClick={toggleExpand}>
              <h1>...</h1>
            </span>
          )}
        </div>
      </div>
      {isDrawerOpen && <MessageDrawer isOpen={isDrawerOpen} content={drawerContent} />}
    </div>
  );
};

export default GifDetailView;
