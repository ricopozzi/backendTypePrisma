import { serverHttp, io } from "./app"

serverHttp.listen(4000, ()=>{
    console.log('Server ir running on port 4000')
})