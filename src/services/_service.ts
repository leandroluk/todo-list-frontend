import axios, { Axios, AxiosError } from 'axios'
import { NotFoundError } from '../errors'

const parseAxiosErrors = (error: AxiosError) => {
  if (!error.response && error.message === 'Network Error') {
    throw new NotFoundError(`The URL "${error.config.url}" does not exist`)
  }
  if (error.response && (error.response as any).message === 'Internal Server Error') {
    throw new NotFoundError('Ocorreu um erro ao tentar acessar a API')
  }
  return Promise.reject(error)
}

export const makeAxios = (): Axios => {
  const instance = axios.create()
  instance.interceptors.response.use(config => config, parseAxiosErrors)
  return instance
}
