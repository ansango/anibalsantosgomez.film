import Balancer from "react-wrap-balancer";

export default function NotFound() {
  return (
    <main className="flex flex-col h-full justify-center flex-1">
      <div className="space-y-5 text-center">
        <h1 className="text-8xl">
          <span>
            404 - <br className="sm:hidden" />
            <br className="hidden md:block" />
            Página no encontrada
          </span>
        </h1>
        <p>
          <Balancer>La página que estás buscando no existe.</Balancer>
        </p>
      </div>
    </main>
  );
}
