const reportWebOpen = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-open').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebOpen;