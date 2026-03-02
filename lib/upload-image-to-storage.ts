import type { StorageProvider } from "./storage"
import type { Readable } from "node:stream"

export interface UploadImageToStorageRequest {
  name: string
  contentType: string
  contentStream: Readable
}

export class UploadImageToStorage {
  constructor(private storage: StorageProvider) {}

  async execute(request: UploadImageToStorageRequest) {
    const { name, contentType, contentStream } = request

    const { url } = await this.storage.uploadFileAsStream({
      path: `images/${name}`,
      contentType,
      stream: contentStream,
    })

    return { url }
  }
}
