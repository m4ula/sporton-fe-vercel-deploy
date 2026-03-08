"use client";

import CardWithHeader from "../ui/card-with-header";
import { CustomerInfo } from "@/app/hooks/use-cart-store";

type Props = {
  formData: CustomerInfo;
  setFormData: React.Dispatch<React.SetStateAction<CustomerInfo>>;
};

const OrderInformation = ({ formData, setFormData }: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <CardWithHeader title="Order Information">
      <div className="px-5 py-6 flex flex-col gap-4">
        <div className="input-group">
          <label>Full Name</label>
          <input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Type your full name"
          />
        </div>

        <div className="input-group">
          <label>Whatsapp Number</label>
          <input
            name="customerContact"
            value={formData.customerContact ?? ""}
            onChange={handleChange}
            placeholder="Type your whatsapp number"
          />
        </div>

        <div className="input-group">
          <label>Shipping Address</label>
          <textarea
            name="customerAddress"
            rows={5}
            value={formData.customerAddress}
            onChange={handleChange}
            placeholder="Type your shipping address"
          />
        </div>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;