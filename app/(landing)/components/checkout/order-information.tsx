"use client";

import { useState } from "react";
import CardWithHeader from "../ui/card-with-header";
import { CustomerInfo } from "@/app/hooks/use-cart-store";

type TOrderInformation  = {
  formData: CustomerInfo;
  setFormData: React.Dispatch<React.SetStateAction<CustomerInfo>>;
};

const OrderInformation = ({formData, setFormData}: TOrderInformation) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <CardWithHeader title="Order Information">
            <div className="px-5 py-4 flex flex-col gap-4">
                <div className="input-group">
                    <label htmlFor="customerName">Full Name</label>
                    <input type="text" placeholder="Type your full name" id="customerName" name="customerName" value={formData.customerName} onChange={handleInputChange}/>
                </div>
                <div className="input-group">
                    <label htmlFor="customerContact">Whatsaap Number</label>
                    <input type="text" placeholder="+62xxxxx" id="customerContact" name="customerContact" value={formData.customerContact} onChange={handleInputChange}/>
                </div>
                <div className="input-group">
                    <label htmlFor="customerAddres">Shipping Address</label>
                    <textarea placeholder="Type your shipping address" id="customerAddress" name="customerAddress" value={formData.customerAddress} onChange={handleInputChange} rows={7}/>
                </div>
            </div>
        </CardWithHeader >
    );
};

export default OrderInformation;