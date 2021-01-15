import axios, { AxiosError } from 'axios'
import { Subject } from 'rxjs'

export abstract class HttpClient {
  protected readonly AxiosInstance

  public static IsLoading = new Subject<boolean>()
  public static Exceptions = new Subject<AxiosError>()

  public constructor(baseURL: string) {
    this.AxiosInstance = axios.create({
      baseURL,
    });

    this.AxiosInstance.interceptors.request.use(async (config) => {
      HttpClient.IsLoading.next(true)
      return Promise.resolve(config)
    })

    this.AxiosInstance.interceptors.response.use(res => {
      console.info(`[${res.status}] ${res.request?.responseURL}`)
      HttpClient.IsLoading.next(false)
      return res
    }, (err: AxiosError) => {
      HttpClient.Exceptions.next(err)
      HttpClient.IsLoading.next(false)
      return Promise.reject(err)
    })
  }
}