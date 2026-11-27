export const projectVideoIds: Record<string, string> = {
  bastion: "X9j7WtuHdNI",
  social: "gDlMq68r7Sg",
  store: "9rBs3WDwJ24",
  chess: "XaV3FRlHK3I",
  animal: "Wg--eS-X1QA",
};

export function projectVideoUrl(art: string) {
  const id = projectVideoIds[art];
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0` : undefined;
}
