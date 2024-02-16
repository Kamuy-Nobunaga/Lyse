import type { TOptions } from "@/types/ProductType";
import { useProductStore } from "@/stores/product";

export default async (url: string, options: TOptions): Promise<any> => {
    const productStore = useProductStore()
    const { method = 'get', headers, body } = options
    productStore.loading = true
    const res = await fetch(url, {
        method, 
        headers: {
            'Content-Type': 'application/json', 
            ...headers
        }, 
        body: JSON.stringify(body)
    }).then(res => res.json())
    productStore.loading = false 
    return res
}