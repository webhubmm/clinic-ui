import DotLoader from "react-spinners/DotLoader";

export default function Skeleton() {
  return (
<div className="h-screen flex justify-center items-center">
      <DotLoader color="#36d7b7" size={18} />
    </div>
  )
}
