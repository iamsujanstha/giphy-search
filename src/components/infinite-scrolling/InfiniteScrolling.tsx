// src/components/InfiniteScroll.tsx
import React, { useRef, useEffect } from "react";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ onLoadMore, hasMore, loading, children }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        onLoadMore(); // Trigger load more when the last element is in view
      }
    });

    if (observerRef.current) observerRef.current.disconnect(); // Disconnect previous observer

    observerRef.current = observer;

    const currentObserver = observerRef.current;

    // Observe the last element
    const lastElement = document.getElementById("last-element");
    if (lastElement) currentObserver.observe(lastElement);

    return () => {
      if (currentObserver && lastElement) {
        currentObserver.unobserve(lastElement);
      }
    };
  }, [loading, hasMore, onLoadMore]);

  return (
    <div>
      {children}
      <div id="last-element" style={{ height: "20px" }} /> {/* A small invisible div for observing */}
    </div>
  );
};

export default InfiniteScroll;
