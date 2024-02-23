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
