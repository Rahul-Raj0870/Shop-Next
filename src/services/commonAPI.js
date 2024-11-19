import axios from "axios"


const commonAPI = async (httpMethod,url,reqBody) => {
    const reqConf = {
        method:httpMethod,
        url, //keep only key name when key and value are having same name
        data:reqBody
    }
    return await axios(reqConf).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
  
}

export default commonAPI