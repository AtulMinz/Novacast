const Hero = () => {
  return (
    <main className="bg-black min-h-screen justify-center flex p-[30vh]">
      <div className="flex flex-col items-center">
        <h1 className="text-gray-300 font-bold text-6xl">
          Welcome to Novacast
        </h1>
        <p className="text-gray-300 mt-3 text-2xl">
          A simple way to stream via browser
        </p>
        <button className="btn btn-primary mt-8">Get Started</button>
      </div>
    </main>
  );
};

export default Hero;
