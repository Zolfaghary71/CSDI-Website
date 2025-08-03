const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Simple performance logging without external dependencies
    if ("performance" in window) {
      // Log basic performance metrics if available
      window.addEventListener("load", () => {
        const navigation = performance.getEntriesByType("navigation")[0];
        if (navigation) {
          onPerfEntry({
            name: "page-load",
            value: navigation.loadEventEnd - navigation.fetchStart,
            id: "page-load-" + Date.now(),
          });
        }
      });
    }
  }
};

export default reportWebVitals;
