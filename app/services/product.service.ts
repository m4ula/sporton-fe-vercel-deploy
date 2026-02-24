import { Product } from "../types";
import{ fetchAPI } from "../lib/api";
import { AppPageRouteHandlerContext } from "next/dist/server/route-modules/app-page/module";


export const getAllProducts = async (): Promise<Product[]> => {
    return await fetchAPI<Product[]>("/products");
}

export const getProductDetail = async (id: string): Promise<Product> => {
  return await fetchAPI<Product>(`/products/${id}`);
};
