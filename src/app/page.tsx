import Link from "next/link";

export default function Home() {
  return (
    <div>
        <header className="bg-blue-300 flex justify-between h-15">
              <h1 className="text-4xl ml-4c py-2">ThecNoBlog</h1>
              <nav className="flex list-none py-5">
                <li className="ml-4">Cadastro</li>
                <li className="ml-4">Entrar</li>
                <li className="ml-4 mr-4">Posts</li>
              </nav>
          </header>
          <main className="flex flex-col items-center h-screen bg-blue-100 text-center pt-25">   

            <div className="pt-0 cursor-pointer pb-10  rounded-xl shadow-2xl bg-white w-80 h-80">
                  <h1 className="text-center bg-gray-300 font-bold pt-2 rounded ">Acesse aqui</h1>
                <h2 className="text-center bg-gray-100 rounded pt-3">Login</h2> <br/>
                <Link href="/login"><button className="bg-blue-500 cursor-pointer rounded w-50 h-10">Login</button></Link> <br/> <br/>
                <h2 className="text-center bg-gray-100 rounded pt-3">Cadastro</h2> <br/>
                <Link href="/cadastroForm"><button className="bg-yellow-500 cursor-pointer rounded w-50 h-10">Cadastro</button></Link>

            </div>
            <div className="pt-30">

                <h3>Quem somos?</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos minima labore expedita doloribus reprehenderit cum necessitatibus culpa quasi nobis ad corrupti provident optio omnis,
                  quas fugiat alias cumque dolorum vel?
                </p>

            </div>
           
          </main>
        <footer className="bg-orange-500 text-center">
           <p>&copy; Matheus Arcangelli</p>
        </footer>
     </div>
  );
}
