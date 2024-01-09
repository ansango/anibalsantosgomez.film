import Balancer from "react-wrap-balancer";

export default function NotFound() {
  return (
    <main className="flex flex-col h-full justify-center flex-1">
      <div className="space-y-5 text-center">
        <h1 className="text-8xl">
          <span>
            404 - <br className="sm:hidden" />
            <br className="hidden md:block" />
            Not Found
          </span>
        </h1>
        <p>
          <Balancer>The page you are looking for does not exist.</Balancer>
        </p>
      </div>
    </main>
  );
}
