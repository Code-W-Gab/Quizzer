import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Header({name, to}) {
  return(
    <div>
      <div className="flex items-center gap-4 bg-green-500 text-white py-3 px-6">
        <Link to={to}>
          <ArrowLeft />
        </Link>
        <h1 className="text-lg font-semibold">{name}</h1>
      </div>
    </div>
  )
}