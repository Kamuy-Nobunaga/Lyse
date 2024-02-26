export interface IProduct {
    url: string,
    name: string,
    price: number,
    id: number
} 

export type TProduct = {
    id: number, 
    title: string,
    price: number,
    description: string,
    category: {
        id: number,
        name: string,
        image: string
    }, 
    images: [string]
}

export type TOptions = {
    method: string, 
    headers: {}, 
    body: {}
}

export type TProduct2 = {
    id?: string, 
    name: string,
    brand: string,
    color: string,
    image: string, 
    categories: string, 
    details: string,
    price: number
}

export type TCart = { 
    id?: string, 
    name: string, 
    brand: string, 
    color: string, 
    size: string, 
    price: number, 
    imgUrl: string,
    amounts: number, 
}

export type TOrders = {
    address: string, 
    email: string, 
    nameCustomer: string, 
    nameDelivery: string, 
    phoneCustomer: string, 
    phoneDelivery: string, 
    amounts: number, 
    brand: string, 
    color: string, 
    imgUrl: string, 
    name: string, 
    price: number, 
    size: string, 
    status: string
}

export type TCustomer = {
    nameCustomer: string, 
    email: string, 
    phoneCustomer: string
}

export type TDelivery = {
    nameDelivery: string, 
    phoneDelivery: string, 
    address: string
}

export type TAccount = {
    email: string, 
    password: string
}