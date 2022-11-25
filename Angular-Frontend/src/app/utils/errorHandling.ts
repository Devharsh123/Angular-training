export interface ResponseStatus{
    status:number
}

const handleResponse=(data:any)=>{
    const response:ResponseStatus=data
    if((response.status=200||201)){
        return data
    }else{
        return 'error found'
    }
}