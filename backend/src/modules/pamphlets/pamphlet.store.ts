const pamphletSentUsers = new Set<string>();

export const hasReceivedPamphlet = (
  userId: string
) => {
  return pamphletSentUsers.has(userId);
};

export const markPamphletSent = (
  userId: string
) => {
  pamphletSentUsers.add(userId);
};