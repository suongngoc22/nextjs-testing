import { useState } from "react";
import { useRouter } from "next/router";

const UploadForm = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform file upload logic here (e.g., using an API endpoint)

    // Redirect to a success page after the upload is completed
    router.push("/success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*, video/*"
        onChange={handleFileChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
