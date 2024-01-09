import React from "react";
interface CityProps {
  id: number;
  city: string;
  country: string;
}

const City: React.FC<CityProps> = ({ id, city, country }) => {
  return (
    <>
      {/* hover:bg-gray-700 hover:dark:bg-gray-400 px-1 py-1 */}
      {/* hover:dark:text-black hover:text-white */}
      <div key={id} className="hover:dark:text-gray-100 hover:text-gray-400 transition cursor-pointer">
        {city}, {country}
      </div>
    </>
  );
};

export default City;
