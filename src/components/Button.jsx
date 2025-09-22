import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

export default function Button() {
  // if (type === "cart")
  //   return (
  //     <div>
  //       <button className="bg-limegreenSecondary w-10 h-4">
  //         <HiOutlineMinus className="text-white text-xs" />
  //       </button>

  //       <span className="text-xs text-zinc-800 mx-1">1</span>

  //       <button className="bg-limegreenSecondary w-10 h-4">
  //         <HiOutlineMinus className="text-white text-xs" />
  //       </button>
  //     </div>
  //   );
  return (
    <button
      className="w-[48px] h-10 bg-limegreenPrimary mt-4 rounded-lg 
        text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-limegreenSecondary"
    >
      <span
        className="flex flex-col gap-[2px] text-center items-center
      "
      >
        <span className="block w-5 h-[3px] bg-limegreenSecondary" />
        <span className="block w-4 h-[3px] bg-limegreenSecondary" />
        <span className="block w-3 h-[3px] bg-limegreenSecondary" />
      </span>
    </button>
  );
}
