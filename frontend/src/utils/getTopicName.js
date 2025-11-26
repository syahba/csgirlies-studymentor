// formatting topic name
export const formatTopicName = (roomName) => {
  if (!roomName) return "Untitled Session";

  const topic = roomName.split("_")[0];
  if (topic.length === 0) return "Untitled Session";

  return topic.charAt(0).toUpperCase() + topic.slice(1);
};
