export interface Product{
    description:string
    discount:number
    pname:string
    price:number
    tax:number
    totalAmount:number
    userId:string
    __v:number
    _id:string 
}

export interface CreateProductData{
    img:string,
    pname:string,
    description:string,
    price:number,
    discount:number,
    tax:number
}

export interface UpdateProductData{
    img?:string,
    pname?:string,
    description?:string,
    price?:number,
    discount?:number,
    tax?:number
}