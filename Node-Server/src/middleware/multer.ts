import multer from "multer";

const memoStorage = multer.memoryStorage();
export const upload = multer({storage:memoStorage})

