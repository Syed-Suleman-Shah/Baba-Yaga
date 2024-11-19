// import React, { useEffect, useState } from "react";

// const CategoryBar = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch categories from the JSON file
//     fetch("../../public/CategoryData.json")
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error("Error fetching categories:", error));
//   }, []);

//   return (
//     <div className="flex items-center space-x-4 overflow-x-auto py-4 px-2 bg-gray-100">
//       {/* Left Arrow */}
//       <button className="p-2 bg-white rounded-full shadow-md text-lg">
//         ←
//       </button>

//       {/* Categories */}
//       {categories.map((category, index) => (
//         <div
//           key={index}
//           className="flex flex-col items-center space-y-2 text-center min-w-[80px]"
//         >
//           <div className="text-2xl">{category.icon}</div>
//           <div className="text-sm text-gray-700">{category.name}</div>
//         </div>
//       ))}

//       {/* Right Arrow */}
//       <button className="p-2 bg-white rounded-full shadow-md text-lg">
//         →
//       </button>
//     </div>
//   );
// };

// export default CategoryBar;



import React, { useEffect, useState, useRef } from "react";

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);
  const scrollContainerRef = useRef(null); // Ref to track the scrollable container

  useEffect(() => {
    // Fetch categories from the JSON file
    fetch("../../../public/CategoryData.json") // Use the correct path if the file is in public folder
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Function to handle horizontal scrolling
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust the amount to scroll
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="flex items-center space-x-4 py-4 px-2 bg-gray-100 ">
      {/* Left Arrow */}
      <button
        onClick={() => handleScroll("left")}
        className="p-2 bg-grey-500 text-black font-bold rounded shadow-md text-lg"
      >
        ←
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center space-x-4 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }} // Smooth scrolling effect
      >
        {/* Categories */}
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 text-center min-w-[80px]"
          >
            <div className="text-2xl cursor-pointer">{category.icon}</div>
            <div className="text-sm text-gray-700 cursor-pointer">{category.name}</div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => handleScroll("right")}
        className="p-2 bg-grey-500 text-black font-bold rounded shadow-md text-lg"
      >
        →
      </button>
    </div>
  );
};

export default CategoryBar;
