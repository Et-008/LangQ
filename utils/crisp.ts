declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export const initCrisp = () => {
  if (typeof window === "undefined") return;

  if (!window.$crisp) window.$crisp = [];
  if (!window.CRISP_WEBSITE_ID) {
    window.CRISP_WEBSITE_ID = "87eac175-00ca-4678-917c-d2d614a3cc00";
  }

  if (document.querySelector('script[src="https://client.crisp.chat/l.js"]')) return;

  const s = document.createElement("script");
  s.src = "https://client.crisp.chat/l.js";
  s.async = true;
  document.head.appendChild(s);
};