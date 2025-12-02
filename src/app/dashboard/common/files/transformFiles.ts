export const transformFileToFiles = (file: File | File[]) => {
  if (!Array.isArray(file)) {
    return [file];
  }
  return file;
};
