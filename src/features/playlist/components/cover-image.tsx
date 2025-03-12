"use client";

// import { Upload, Loader2 } from "lucide-react";

export function CoverImage({
  imageSrc,
}: {
  imageSrc: string | null;
  playlistId: string;
}) {
  const currentUrl = imageSrc
    ? "https://www.argospetinsurance.co.uk/assets/uploads/2017/12/cat-pet-animal-domestic-104827.jpeg"
    : imageSrc;

  if (currentUrl) {
    return (
      <img
        src={currentUrl}
        alt="Playlist cover"
        style={{
          width: "6rem",
          height: "6rem",
          objectFit: "cover",
          borderRadius: "0.25rem",
        }}
      />
    );
  }

  return (
    // TODO: EDIT IMAGE LOGIC FOR PLAYLIST
    null
    // <form action={formAction}>
    //   <input type="hidden" name="playlistId" value={playlistId} />
    //   <label
    //     htmlFor="coverUpload"
    //     className="w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center border border-neutral-700 rounded border-dashed text-white cursor-pointer"
    //   >
    //     <input
    //       id="coverUpload"
    //       type="file"
    //       name="file"
    //       accept="image/*"
    //       className="hidden"
    //       onChange={(e) => {
    //         const file = e.target.files?.[0];
    //         if (file) {
    //           if (file.size <= 5 * 1024 * 1024) {
    //             e.target.form?.requestSubmit();
    //           } else {
    //             alert("File size exceeds 5MB limit");
    //             e.target.value = "";
    //           }
    //         }
    //       }}
    //     />
    //     {pending ? (
    //       <Loader2 className="w-5 h-5 animate-spin text-neutral-600" />
    //     ) : (
    //       <>
    //         <Upload className="w-3 h-3 mb-1" />
    //         <span className="text-xs text-center">Upload</span>
    //       </>
    //     )}
    //   </label>
    // </form>
  );
}
