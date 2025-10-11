import { ImpulseSpinner } from "react-spinners-kit";




export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <ImpulseSpinner frontColor="#4FD1C5" backColor="#2C7A7B" />
    </div>
  );
}