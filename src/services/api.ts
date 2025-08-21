import axios from "axios";

type Metodo = 'get' | 'post' | 'put' | 'delete'

export default async function api(method: Metodo, endpoint: string) {
      try {
            const res = await axios[method](endpoint);
                
            if(res.data && res.data?.data)
                return res.data.data
      }catch(error) {
        return error;
      }
}