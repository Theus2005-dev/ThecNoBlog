import { MdOutlineDashboard } from "react-icons/md";

export default function Page(){

    return(
        <div>
            <header className="flex flex-row justify-between bg-blue-300">
                <h1 className="ml-10 text-5xl">Dashboard</h1>
                <MdOutlineDashboard className="text-5xl text-pink-500"/>
                <nav className="flex flex-row list-none pt-2 space-x-6">
                   <li className="text-2xl">Blogs</li>
                   <li className="text-2xl">Meus Posts</li>
                   <li className="mr-5 text-2xl">Assinatura</li>
                </nav>
            </header>
            <section>
                <h1>Olá</h1>
            </section>
        </div>

    )
}