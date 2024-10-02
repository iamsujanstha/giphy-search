import { useLocation } from 'react-router-dom';
import styles from './gifDeailView.module.scss'

const GifDetailView = () => {
  const location = useLocation();
  const gifData = location.state?.gifData; // Access the passed data

  if (!gifData) {
    // Handle case where gifData is not available
    return <p>No GIF data available.</p>;
  }
  console.log(gifData)
  return (
    <div className={styles.gifDetail}>
      <div>
        <img src={gifData.images.fixed_width.url} alt={gifData.title} />
      </div>
      <div>
        {/* {gifData?.tags.map((tag) => { 
<Tag 
        })} */}
      </div>
    </div>
  );
};

export default GifDetailView;
