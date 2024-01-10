
export default function RenderHeader() {
  return (
    <header className="text-black  w-full h-20 flex justify-around items-center">
          <span className="ml-3 text-xl text-primary"><strong>clarke</strong>energia</span>
        <nav className=" flex flex-wrap items-center text-base justify-center">
          <ul className="flex flex-row gap-5">
            <li className="font-extrabold hover:underline hover:text-primary">Sobre nós</li>
            <li className="font-extrabold hover:underline hover:text-primary">
              Nossas soluções
            </li>
            <li className="font-extrabold hover:underline hover:text-primary">
              Mercado Livre
            </li>
            <li className="font-extrabold hover:underline hover:text-primary">
              Desperdiçômetro
            </li>
            <li className="font-extrabold hover:underline hover:text-primary">Blog</li>
            <li className="font-extrabold underline text-primary">Fornecedores</li>
          </ul>
        </nav>
        <button className="rounded-full bg-primary w-48 h-10 text-black font-extrabold border border-black" >Seja nosso cliente</button>
    </header>
  );
}
