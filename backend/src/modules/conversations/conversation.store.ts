type Message = {
  role: "user" | "assistant";
  content: string;
};

const conversations = new Map<string, Message[]>();

export const addMessage = (
  userId: string,
  message: Message
) => {
  const existing = conversations.get(userId) || [];

  existing.push(message);

  // Keep last 10 messages
  if (existing.length > 10) {
    existing.shift();
  }

  conversations.set(userId, existing);
};

export const getConversation = (
  userId: string
): Message[] => {
  return conversations.get(userId) || [];
};

export const clearConversation = (
  userId: string
) => {
  conversations.delete(userId);
};