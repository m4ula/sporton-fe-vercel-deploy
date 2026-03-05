import Image from "next/image";
import { FiEdit, FiEdit2, FiTrash } from "react-icons/fi";

const categoryData = [
  {
    name: "Running",
    imageUrl: "/images/categories/category-running.png",
    description: "Lorem ipsum",
  },
  {
    name: "Basketball",
    imageUrl: "/images/categories/category-basketball.png",
    description: "Lorem ipsum",
  },
  {
    name: "Football",
    imageUrl: "/images/categories/category-football.png",
    description: "Lorem ipsum",
  },
];

const CategoryTable = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Category Name</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categoryData.map((data, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-6 py-4 font-medium">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-gray-100 p-1">
                    <Image
                      src={data.imageUrl}
                      width={48}
                      height={48}
                      alt={data.name}
                      className="object-contain"
                    />
                  </div>
                  <span>{data.name}</span>
                </div>
              </td>

              <td className="px-6 py-4 text-gray-600">
                {data.description}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
                    aria-label="Edit category"
                  >
                    <FiEdit2 size={18} />
                  </button>

                  <button
                    className="flex h-9 w-9 items-center justify-center rounded-md text-red-600 hover:bg-red-100"
                    aria-label="Delete category"
                  >
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

export default CategoryTable;