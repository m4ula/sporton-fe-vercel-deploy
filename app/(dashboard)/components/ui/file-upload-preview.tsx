"use client";

import Image from "next/image";
import { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
    label?: string;
    value?: string | null;
    onChange: (file: File) => void;
    className?: string;
};

const ImageUploadPreview = ({
    label,
    value,
    onChange,
    className,
}: TImageUploadPreviewProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onChange(file);
    };

    return (
        <div className={className}>
            {label && (
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            {/* Aspect ratio container 1:1 */}
            <div
                onClick={handleClick}
                className="
          relative
          w-full
          aspect-square
          cursor-pointer
          rounded-lg
          border-2
          border-dashed
          border-primary
          bg-primary/5
          flex
          items-center
          justify-center
          overflow-hidden
          transition
          hover:bg-primary/10
        "
            >
                {value ? (
                    <Image
                        src={value}
                        alt="preview"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-primary">
                        <FiUploadCloud size={28} />
                        <span className="text-sm font-medium">Click to Upload</span>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default ImageUploadPreview;