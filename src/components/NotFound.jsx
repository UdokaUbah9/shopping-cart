import BackButton from "./BackButton";

export default function NotFound() {
  return (
    <div className="relative flex justify-center items-center  h-[50vh] flex-col">
      <BackButton />

      <p className="flex items-center justify-center text-6xl font-bold ">
        404
      </p>
      <h1 className="font-bold text-2xl text-center py-3 px-4 tracking-wide">
        Page Not Found!
      </h1>
    </div>
  );
}
