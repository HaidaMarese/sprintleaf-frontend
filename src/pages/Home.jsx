import Navbar from "../components/Navbar"; 

function Home() {
  const heroUrl =
    "https://www.business2community.com/wp-content/uploads/2020/12/learning-management-system.jpg";

  return (
    <>
      <Navbar />
      <section className="relative min-h-[70vh] flex items-center justify-center text-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.6)",
          }}
        />
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold drop-shadow">
            Welcome to SprintLeaf
          </h1>
          <p className="mt-4 text-white/90 text-lg">
            A clean project & task manager with calendar insights for small
            teams and solo makers.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
