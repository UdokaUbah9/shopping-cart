export default function NotFound() {
  return (
    <div className="relative">
      <BackButton />
      <h1 className="font-bold text-2xl text-center py-3 px-4 tracking-wide">
        Page Not Found!
      </h1>

      <p className="flex items-center justify-center h-[50vh] text-3xl">404</p>

      <Footer type="home" />
    </div>
  );
}
