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