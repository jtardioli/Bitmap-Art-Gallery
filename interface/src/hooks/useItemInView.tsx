import React, { useCallback, useRef } from "react";

const useItemInView = (
  observer: React.MutableRefObject<IntersectionObserver | null>,
  cb: () => void
) => {
  //This monitors the last protocol in the list, fetching the next page when it's viewed if more protocols exist.

  const elementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          cb();
        }
      });

      if (node) observer.current.observe(node);
    },
    [observer]
  );

  return elementRef;
};

export default useItemInView;
