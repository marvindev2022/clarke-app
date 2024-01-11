import { useEffect, useState, useRef } from "react";
import RenderHeader from "../../components/Header";
import RenderTable from "../../components/Table";
import instance from "../../service/instance";
import { notifyError, promiseToast } from "../../utils/notifications";

export default function RenderHome() {
  const [online, setOnline] = useState(false);
  const hasEffectRun = useRef(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { status } = await promiseToast(
          instance.get("/supplier/find"),
          "Ligando ao servidor",
          "Conectado ao servidor"
        );

        if (status < 400 && !online) {
          setOnline(true);
        }
      } catch (error) {
        notifyError("Servidor offline");
      }
    }

    if (!hasEffectRun.current) {
      fetchData();
      hasEffectRun.current = true;
    }
  }, []);

  return (
    <section className="w-screen h-screen">
      <RenderHeader />
      <RenderTable />
    </section>
  );
}
