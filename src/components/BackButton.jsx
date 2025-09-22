import { Link } from "react-router-dom";

export default function BackButton() {
  return (
    <Link to="/">
      <button className="absolute top-4 left-4 text-2xl font-bold">
        &larr;{" "}
      </button>
    </Link>
  );
}
