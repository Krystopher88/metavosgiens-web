/**
 * next/link skips its own click handling (and therefore any scroll) when the
 * resolved target URL is identical to the current one — including the hash.
 * That leaves clicks on an already-active nav link inert even after the user
 * has scrolled away from that anchor. This restores the expected scroll
 * (to top, or to the target section) for exactly that case, and steps aside
 * for every other click so next/link's normal navigation still runs.
 */
export function handleInPageNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return;
  }

  if (url.pathname !== window.location.pathname) return;

  const targetHash = url.hash.replace("#", "");
  const currentHash = window.location.hash.replace("#", "");
  if (targetHash !== currentHash) return;

  event.preventDefault();
  if (!targetHash || targetHash === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById(targetHash)?.scrollIntoView({ behavior: "smooth" });
  }
}
