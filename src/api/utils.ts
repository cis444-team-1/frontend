import { api } from "./api-client";
import { routes } from "./routes";

export const uploadImage = async (imageFile: File) => {
  const form = new FormData();
  form.append("file", imageFile);
  const { data } = await api.post(routes.uploadFile, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
