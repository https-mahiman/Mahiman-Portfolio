// Next.js' default browser range includes Safari versions without URL.canParse.
// Keep that fallback while omitting polyfills for features already supported
// by the modern browsers Lighthouse targets.
type URLWithCanParse = typeof URL & {
  canParse?: (url: string | URL, base?: string | URL) => boolean;
};

const urlConstructor = URL as URLWithCanParse;

if (typeof urlConstructor.canParse !== "function") {
  Object.defineProperty(urlConstructor, "canParse", {
    configurable: true,
    writable: true,
    value(url: string | URL, base?: string | URL) {
      try {
        new URL(url, base);
        return true;
      } catch {
        return false;
      }
    },
  });
}

export {};
