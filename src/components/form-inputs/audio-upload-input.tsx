import { useFormContext } from "react-hook-form";
import styles from "./audio-upload-input.module.css";
import { Button } from "../button/button";

export const AudioUploadInput = () => {
  const form = useFormContext();

  const watchFile: File = form.watch("audioSrc");

  const triggerFileInput = () => {
    document.getElementById("audioSrc")?.click();
  };

  const handleFileDrop = (files: FileList) => {
    if (files.length > 0 && files[0].type.startsWith("audio/")) {
      form.setValue("audioSrc", files[0], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      {watchFile && (
        <Button
          type="text"
          className={styles.removeButton}
          onClick={() => form.setValue("audioSrc", null)}
        >
          Remove
        </Button>
      )}
      <div
        className={`${styles.uploadContainer} ${
          watchFile ? styles.fileSelected : ""
        }`}
        onClick={triggerFileInput}
      >
        <input
          id="audioSrc"
          type="file"
          accept="audio/*"
          {...form.register("audioSrc")}
          className={styles.fileInput}
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              handleFileDrop(files);
            }
          }}
        />

        {!watchFile ? (
          <div className={styles.uploadPrompt}>
            <h1>Click to select audio</h1>
            <p>max 100mb</p>
          </div>
        ) : (
          <div className={styles.fileInfo}>
            <p>{watchFile.name}</p>
            <p>{(watchFile.size / (1024 * 1024)).toFixed(2)}mb</p>
          </div>
        )}
      </div>
      {watchFile && (
        <audio
          src={URL.createObjectURL(watchFile)}
          controls
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
};
