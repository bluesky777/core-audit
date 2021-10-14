import { AxiosInstance } from "axios"

export const IglesiasRepo = (api: AxiosInstance)=>{
    return {
         get: ()=> api.put('/iglesias/de-asociacion')
    }
}