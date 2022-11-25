export interface JwtAuthPayload { 
    _id: string
    name: string,
    email: string,
    userType: string    
}

export interface UserDetailDto {
    name: string
    email: string
    password: string
    dob: string
    address: string
    phone: number
}

export interface createProductPayload extends JwtAuthPayload {
    img: string,
    pname: string,
    description: string,
    price: number,
    discount?: number,
    tax?: number
}

export interface updateProductPayload extends JwtAuthPayload {
    productId: string,
    img?: string,
    pname?: string,
    description?: string,
    price?: number,
    discount?: number,
    tax?: number
}

export interface deleteProductPayload extends JwtAuthPayload {
    productId: string
}

export interface getProductPayload {
    userId?: string
    productId?: string
    pname?: string
    search?: string
    offset?: number
    rows?: number
    sort?: string
}

export interface toggleFavouriteProductPayload extends JwtAuthPayload {
    productId: string,
}

export interface getCartPayload extends JwtAuthPayload{
    userId?:string,
   
}