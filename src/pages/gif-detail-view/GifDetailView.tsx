/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from 'react-router-dom';
import styles from './gifDeailView.module.scss'
import Tag from '@/components/tag/Tag';
import { Icons } from '@/utils/iconConfig';
import { useState } from 'react';

const GifDetailView = () => {
  const location = useLocation();
  const gifData = location.state?.gifData;
  const [isExpanded, setIsExpanded] = useState(false);
  const [favourite, setFavourite] = useState<string[]>([]);


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFavorite = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavourite((prev) =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  if (!gifData) {
    return <p>No GIF data available.</p>;
  }
  const visibleTags = isExpanded ? gifData?.tags : gifData?.tags.slice(0, 4);

  return (
    <div className={styles.container}>
      <div className={styles.gifDetail}>
        <div className={styles.imgContainer}>
          <img src={gifData.images.fixed_width.url} alt={gifData.title} />
          <span className={styles.iconContainer}>
            <span onClick={handleFavorite(gifData.id)}>
              <Icons.favouriteIcon
                size="28"
                color={favourite.find((id) => id === gifData.id) ? 'red' : ''}
              />
              Favourite
            </span>
            <span><Icons.shareIcon size='28' /> Share</span>
          </span>
          <div className={styles.overlay}>
            <h1>Share Gif</h1>
            <span><Icons.closeIcon /></span>
            <button><Icons.linkIcon size='14' /><span>Copy Gif Link</span></button>
          </div>
        </div>
        <div className={styles.tags}>
          {visibleTags?.map((tag: any) => {
            return (<Tag name={tag} />)
          })}

          {!isExpanded && (
            <span className={styles.moreTag} onClick={toggleExpand}>
              <h1>...</h1>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GifDetailView;
