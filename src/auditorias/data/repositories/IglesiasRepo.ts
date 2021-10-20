import { AxiosInstance } from "axios"

export const IglesiasRepo = (api: AxiosInstance)=>{
    return {
         get: (asociacion_id: number)=> api.put('/iglesias/de-asociacion', {asociacion_id})
    }
}