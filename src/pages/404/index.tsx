import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  function handleBack() {
    navigate(`/`);
  }

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center bg-newgray">
      <h1 className="text-5xl text-balck">404</h1>
      <h2 className="text-2xl text-balck">Page Not Found</h2>
      <button
        onClick={handleBack}
        className="bg-primary text-balck px-4 py-2 rounded-md mt-4"
      >
        Voltar
      </button>
    </section>
  );
}
