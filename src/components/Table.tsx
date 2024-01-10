import { ReactNode, useEffect } from "react";
import { useSupplier } from "../Context/supplier.context";
import { useAnimation } from "framer-motion";
import instance from "../service/instance";
import { notifyError } from "../utils/notifications";
import search from "../assets/search.svg";
import AnimationContainer from "./animationContainer";

interface IProps {
  name: string;
  logo: string;
  state_abbreviation: string;
  cost_per_kwh: number;
  min_kwh_limit: number;
  total_customers: number;
  average_customer_rating: number;
  id: number;
}

const SupplierInfo = ({ value }: { value: string | number | ReactNode }) => (
  <td className="flex justify-center items-center w-40 text-center h-28">
    {value}
  </td>
);

export default function RenderTable() {
  const {
    supplier,
    setSupplier,
    submited,
    setSubmited,
    filteredSuppliers,
    setFilteredSuppliers,
    userConsumption,
    setUserConsumption,
  } = useSupplier();
  const controls = useAnimation();

  const handleSearch = () => {
    setSubmited(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const { data } = await instance.get("/supplier/find");
        setSupplier(
          data.map((item: IProps) => ({
            id: item.id,
            name: item.name,
            logo: item.logo,
            stateAbbreviation: item.state_abbreviation,
            costPerKwh: item.cost_per_kwh,
            minKwhLimit: item.min_kwh_limit,
            totalCustomers: item.total_customers,
            averageCustomerRating: item.average_customer_rating,
          }))
        );
      } catch (error: any) {
        notifyError(error.message);
      }
    };
    fetchSupplier();
  }, [setSupplier]);

  useEffect(() => {
    const filterSuppliers = supplier.filter(
      (item: any) => item.totalCustomers >= Number(userConsumption)
    );
    setFilteredSuppliers(filterSuppliers as any);
  }, [submited]);

  useEffect(() => {
    controls.start({
      opacity: Number(userConsumption) < 1 ? 1 : 0,
      y: Number(userConsumption) < 1 ? 0 : 20,
    });
  }, [submited, controls]);

  return (
    <section className="w-full h-full flex flex-col items-center bg-[url(https://tratamentodeagua.com.br/wp-content/uploads/2021/09/energia-eolica.jpg)] bg-no-repeat bg-cover gap-5 pb-10">
      <div className="w-full h-full bg-[#00000080] flex flex-col items-center ">
        <div
          className={`${
            !submited && "flex items-center justify-evenly pt-10"
          } w-full rounded-2xl px-5 flex justify-center`}
        >
          <AnimationContainer controls={controls} />
          <div className="flex flex-col items-center justify-center mt-8 gap-2">
            <label className="mr-4 text-2xl text-white pb-2">
              Informe seu consumo Mensal (kWh):
            </label>
            <div className="w-full flex flex-row items-center justify-center gap-2 relative">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*[.,]?[0-9]*"
                value={userConsumption}
                placeholder="Ex: 1000"
                onKeyUp={handleKeyPress}
                onChange={(e) => {
                  const inputValue = parseFloat(e.target.value);
                  setUserConsumption(
                    isNaN(inputValue) ? "" : Math.max(0, inputValue).toString()
                  );
                }}
                className="border h-14 w-full rounded-full text-black px-5 border-black"
              />

              <img
                onClick={handleSearch}
                className="w-5 h-5 absolute right-5 "
                src={search}
                alt="buscar"
              />
            </div>
          </div>
        </div>
        {filteredSuppliers.length > 0 &&
        submited &&
        Number(userConsumption) > 0 ? (
          <table className="flex flex-col w-8/12 max-h-[50rem] min-h-[10rem] h-[60%] bg-white rounded-2xl px-5 mt-10">
            <thead className="w-full border-b border-white h-20 mb-5">
              <tr className="w-full flex gap-5 justify-around text-center items-center">
                <th className="w-40 h-20 justify-center items-center flex">
                  Nome
                </th>
                <th className="w-40 h-20 justify-center items-center flex">
                  Logo
                </th>
                <th className="w-40 h-20 justify-center items-center flex">
                  Estado
                </th>
                <th className="w-40 h-20 justify-center items-center flex">
                  Custo por kWh
                </th>
                <th className="w-40 h-20 justify-center items-center flex">
                  Limite Mínimo/kWh
                </th>
                <th className="w-40 h-20 justify-center items-center flex">
                  Total de Clientes
                </th>
                <th className="w-40 h-20 justify-center items-center flex">
                  Avaliação Média dos Clientes
                </th>
              </tr>
            </thead>
            <tbody
              id="scroll"
              className="w-full h-[40rem] overflow-auto mr-5 border-t border-black"
            >
              {filteredSuppliers?.map((item) => (
                <tr
                  className="w-full flex gap-5 justify-around items-center border-b border-black py-5 "
                  key={item.id}
                >
                  <SupplierInfo value={item.name} />
                  <SupplierInfo
                    value={
                      <img
                        src={item.logo}
                        alt="logo"
                        className="rounded-xl w-40 h-28"
                      />
                    }
                  />
                  <SupplierInfo value={item.stateAbbreviation} />
                  <SupplierInfo value={item.costPerKwh} />
                  <SupplierInfo value={item.minKwhLimit} />
                  <SupplierInfo value={item.totalCustomers} />
                  <SupplierInfo value={item.averageCustomerRating} />
                </tr>
              ))}
            </tbody>
          </table>
        ) : submited &&
          (userConsumption !== "" || parseFloat(userConsumption) > 0) ? (
          <div className="flex flex-col items-center justify-center mt-8 gap-2">
            <label className="mr-4 text-2xl text-white pb-2">
              Não há fornecedores disponíveis para o seu consumo mensal
            </label>
          </div>
        ) : (
          submited && (
            <div className="flex flex-col items-center justify-center gap-2">
              <label className="mr-4 text-2xl text-white pb-2">
                Informe seu consumo mensal para ver os fornecedores disponíveis
              </label>
            </div>
          )
        )}
      </div>
    </section>
  );
}
