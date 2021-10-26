import { AxiosInstance } from "axios"

export const IglesiasRepo = (api: AxiosInstance)=>{
    return {
         get: (asociacion_id: number) => api.put('/iglesias/de-asociacion', {asociacion_id}),
         find: (iglesia_id: number) => api.put('/iglesias/find', {iglesia_id})
    }
}