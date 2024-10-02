import Giphy from '@/containers/giphy/Giphy';
import styles from './homepage.module.scss'
import { ErrorBoundary } from 'react-error-boundary';

const HomePage = () => {
  function fallbackRender({ error, resetErrorBoundary }: { error: string, resetErrorBoundary: () => void }) {

    resetErrorBoundary();
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error}</pre>
      </div>
    );
  }
  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
    >
      <div className={styles.home}>
        <Giphy />
      </div>
    </ErrorBoundary>
  )
}

export default HomePage

