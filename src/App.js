import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <section class="bg-gradient-to-r from-sky-500 to-indigo-500">
      <div class="flex flex-col py-8 px-4 mx-auto min-h-screen text-center items-center justify-center lg:py-16 lg:px-12">
        <h1 className="text-slate-600 text-6xl font-semibold">Linktree</h1>
        <p className="mt-1 text-slate-50 text-lg">Empieza a crear tus Links</p>
        <Link to='/login' className="border-2 border-x-slate-50 text-gray-50 bg-transparent mt-6 p-3 rounded-xl hover:bg-slate-50 hover:text-slate-600 font-medium">Empezar</Link>
      </div>
    </section>
  );
}

export default App;
