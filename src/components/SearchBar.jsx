import { HiOutlineMicrophone, HiOutlineSearch } from "react-icons/hi";
import Button from "./Button";
import { useCart } from "../context/CartContext";

export default function SearchBar() {
  const { searchInput, onSearchInput } = useCart();
  return (
    <div className="flex gap-2 items-center">
      <div className="relative mt-4 w-[720px]">
        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 md:text-lg" />
        <input
          type="text"
          placeholder="Search drugs..."
          value={searchInput}
          onChange={onSearchInput}
          className="pl-8 pr-10 py-2 rounded w-full font-roboto bg-limegreenPrimary h-8  md:h-10 md:text-lg text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-limegreenSecondary"
        />
        <HiOutlineMicrophone className="absolute top-1/2 -translate-y-1/2 text-zinc-500 right-3 md:text-lg" />
      </div>
      <div className="flex-shrink-0">
        <Button />
      </div>
    </div>
  );
}

// export default function SearchBar({ icon, placeholder }) {
//   return (
//     <div className="flex gap-2 items-center">
//       <div className="relative mt-4 w-[280px]">
//         {icon}
//         <input
//           type="text"
//           placeholder={placeholder + icon}
//           className="pl-10 pr-10 py-2 rounded w-full font-roboto bg-limegreenPrimary h-10 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-limegreenSecondary"
//         />
//         <HiOutlineMicrophone className="absolute top-1/2 -translate-y-1/2 text-zinc-500 right-3 text-2xl" />
//       </div>
//       <div className="flex-shrink-0">
//         {placeholder === "search drugs..." && <Button />}
//       </div>
//     </div>
//   );
// }
