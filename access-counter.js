// Shared GAS endpoint and GET options verified against tower-of-hanoi/index.html.
// Loaded once per page; game actions never call this code. No retries or UI output.
(() => {
  try {
    fetch('https://script.google.com/macros/s/AKfycbxssCIHsD-N97SHxNC_GN0ihYeC0qy-lb-EY0KmSs6Gnztaph1sITMerLVEnNWOGkYc/exec?app=stat-golf', {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      credentials: 'omit',
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Access logging must never interrupt gameplay, statistics or data storage.
  }
})();
