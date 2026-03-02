import type { VercelRequest, VercelResponse } from "@vercel/node"
import formidable from "formidable"
import { createReadStream } from "node:fs"
import { unlink } from "node:fs/promises"
import { R2StorageProvider } from "../lib/r2-storage.js"
import { UploadImageToStorage } from "../lib/upload-image-to-storage.js"

const MAXIMUM_FILE_SIZE_IN_BYTES = 1024 * 1024 * 4 // 4MB

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ message: "Method not allowed" })
  }

  const form = formidable({
    maxFileSize: MAXIMUM_FILE_SIZE_IN_BYTES,
  })

  try {
    const [, files] = await form.parse(req)

    const file = Array.isArray(files.file) ? files.file[0] : files.file
    if (!file || !file.filepath) {
      return res.status(400).json({ message: "Invalid file provided." })
    }

    if (file.size && file.size > MAXIMUM_FILE_SIZE_IN_BYTES) {
      return res.status(400).json({
        message: "File size must be a maximum of 4MB.",
      })
    }

    const contentStream = createReadStream(file.filepath)
    const storageProvider = new R2StorageProvider()
    const uploadImageToStorage = new UploadImageToStorage(storageProvider)

    const { url } = await uploadImageToStorage.execute({
      name: file.originalFilename || file.newFilename || "image",
      contentType: file.mimetype || "application/octet-stream",
      contentStream,
    })

    await unlink(file.filepath).catch(() => {})

    return res.status(201).json({ url })
  } catch (error) {
    console.error("Upload error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
