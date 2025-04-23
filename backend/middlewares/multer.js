import multer from "multer";

const storage = multer.memoryStorage();
export const uploadMultiple = multer({ storage });
