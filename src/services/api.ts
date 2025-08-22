import axios from "axios";

type Metodo = 'get' | 'post' | 'put' | 'delete'

export default async function api(method: Metodo, endpoint: string, dataCriacao: string) {
      try {
            const res = await axios[method](`${endpoint}?dataCriacao=${dataCriacao}`);
                
            if(res.data && res.data?.data)
                if(dataCriacao)
                  return {
                    data: res.data?.data.filter(item => item.dataCriacao.includes(dataCriacao)),
                    paginacao: res.data.paginacao
                  } 
                return {
                  data: res.data?.data,
                  paginacao: res.data.paginacao
                }
      }catch(error) {
        return error;
      }
}