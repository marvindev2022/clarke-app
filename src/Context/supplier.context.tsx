import React, { createContext, useContext, ReactNode, useState } from "react";
export interface ISupplier {
  id: number;
  name: string;
  logo: string;
  stateAbbreviation: string;
  costPerKwh: number;
  minKwhLimit: number;
  totalCustomers: number;
  averageCustomerRating: number;
}
interface IContextProps {
  children: ReactNode;
}

interface SupplierStates {
  supplier: ISupplier[];
  setSupplier: React.Dispatch<React.SetStateAction<ISupplier[]>>;
  userConsumption : string | number;
  setUserConsumption : React.Dispatch<React.SetStateAction<string>>;
  filteredSuppliers : ISupplier[] ;
  setFilteredSuppliers : React.Dispatch<React.SetStateAction<ISupplier[]>>;
  submited : boolean;
  setSubmited : React.Dispatch<React.SetStateAction<boolean>>;
}

const SupplierContext = createContext<SupplierStates | undefined>(undefined);

export const SupplierProvider: React.FC<IContextProps> = ({ children }) => {
  const [supplier, setSupplier] = useState<ISupplier[]>([]);
  const [userConsumption, setUserConsumption] = useState<string>("");
  const [filteredSuppliers, setFilteredSuppliers] = useState<ISupplier[]>([]);
  const [submited, setSubmited] = useState<boolean>(false);

  const SupplierContextValue: SupplierStates = {
    supplier,
    setSupplier,
    userConsumption,
    setUserConsumption,
    filteredSuppliers,
    setFilteredSuppliers,
    submited,
    setSubmited,
  };

  return (
    <SupplierContext.Provider value={SupplierContextValue}>
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("useSupplier must be used within a SupplierProvider");
  }
  return context;
};
