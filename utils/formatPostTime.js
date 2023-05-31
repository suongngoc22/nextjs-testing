export function formatPostTime(createdDate) {
  const now = new Date();
  const diffInMs = now - createdDate;

  // Convert milliseconds to hours
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (hours < 24) {
    // Less than 24 hours, display in hours
    return `${hours} hours ago`;
  } else {
    // More than 24 hours, display creation date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return createdDate.toLocaleDateString(undefined, options);
  }
}
