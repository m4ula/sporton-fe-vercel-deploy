import { getImageUrl } from "@/app/lib/api";
import { Product } from "@/app/types";
import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiEdit, FiEdit2, FiTrash } from "react-icons/fi";

type TProductTableProps = {
  products: Product[];
  onDelete?: (id: string) => void;
  onEdit?: (product: Product) => void;
}

const ProductTable = ({products, onDelete, onEdit}:TProductTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((data, index) => (
            <tr
              key={data._id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-6 py-4 font-medium">
                <div className="flex items-center gap-2">
                  <div className="aspect-square rounded-md bg-gray-100 p-1">
                    <Image
                      src={getImageUrl(data.imageUrl)}
                      width={52}
                      height={52}
                      alt={data.name}
                      className="aspect-square object-contain"
                    />
                  </div>
                  <span>{data.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">
                <div className="rounded-md bg-gray-200 px-2 py-1 font-medium w-fit">
                  {data.category.name}
                </div>
              </td>
              <td className="px-6 py-4 font-medium">{priceFormatter(data.price)}</td>
              <td className="px-6 py-4 font-medium">{data.stock} units</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => onEdit?.(data)}>
                    <FiEdit2 size={18} />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center cursor-pointer rounded-md hover:bg-red-100 text-red-600" onClick={() => onDelete?.(data._id)}>
                    <FiTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;