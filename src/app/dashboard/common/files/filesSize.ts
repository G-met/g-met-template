const MAX_FILE_SIZE = 4500000; // 4.5 MB

export function validateFileListSize(files: FileList | File[]): boolean {
  const fileArray = Array.from(files);
  const allFilesValid = fileArray.every((file) => file.size <= MAX_FILE_SIZE);
  if (!allFilesValid) return false;
  return true;
}
