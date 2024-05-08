import axios, { AxiosRequestHeaders, AxiosResponse } from "axios"
import SERVICES from "./api"

type Keys = keyof typeof SERVICES
type LoadingFunc = (percentage: number) => null
interface Props {
  data?: object
  headers?: AxiosRequestHeaders
  params?: string
  query?: object
}

type APIType = {
  [key in keyof typeof SERVICES]?: <T = unknown>(
    obj: Props,
    uploadProgress?: LoadingFunc,
    downloadProgress?: LoadingFunc
  ) => Promise<AxiosResponse<T>>
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

const API: APIType = {}

for (const [keys, values] of Object.entries(SERVICES)) {
  API[keys as Keys] = (
    { data, headers, query, params },
    uploadProgress,
    downloadProgress
  ) => {
    return axiosInstance({
      ...(params ? { url: `${values.uri + params}` } : { url: values.uri }),
      method: values.method,
      ...(query ? { params: query } : {}),
      headers: {
        ...(headers && {
          headers,
        }),
      },
      ...(data && { data: data }),
      onUploadProgress: (progressEvent) => {
        if (uploadProgress) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 0)
          )
          uploadProgress(percentage)
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (downloadProgress) {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 0)
          )
          downloadProgress(percentage)
        }
      },
    })
  }
}

export { API }
