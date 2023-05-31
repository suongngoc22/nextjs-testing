export function checkMediaType(link) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4", "avi", "mov", "wmv"];

  const fileExtension = link.split(".").pop().toLowerCase();

  if (imageExtensions.includes(fileExtension)) {
    return "image";
  } else if (videoExtensions.includes(fileExtension)) {
    return "video";
  } else {
    return "unknown";
  }
}
