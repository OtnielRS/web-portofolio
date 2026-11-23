export default function visibleSection(id: string): HTMLElement | undefined {
  // Cached routes can keep duplicate IDs in hidden Activity trees.
  return Array.from(document.querySelectorAll<HTMLElement>("[id]")).find(element => element.id === id && element.getClientRects().length > 0);
}
