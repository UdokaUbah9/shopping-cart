import BackButton from "../components/BackButton";
import Footer from "../components/Footer";

export default function ProfilePage() {
  return (
    <div className="relative">
      <BackButton />
      <h1 className="font-bold text-2xl text-center py-3 px-4 tracking-wide">
        User Profile
      </h1>

      <em className="flex items-center justify-center h-[50vh] border-2 border-dashed border-gray-300 rounded-lg bg-limegreenCart">
        Coming Soon!
      </em>

      <Footer type="home" />
    </div>
  );
}
// flex items-center justify-center h-[70vh] border-2 border-dashed border-gray-300 rounded-lg bg-limegreenCart
