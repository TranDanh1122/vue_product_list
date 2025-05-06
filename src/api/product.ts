import type { Product } from "../type";

export async function fetchProductApi(): Promise<Product[]> {
    const res = await fetch("data.json")
    if (!res.ok) throw new Error("Fetch Product Error")
    const data = await res.json()
    return data
}