import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOverdueCombos } from "../../redux/overdueSlice";
import { fetchQuickStats } from "../../redux/quickStatsSlice"; // 🔹 ADDED
import RaceCard from "../Cards/RaceCard";
import StateTable from "../StateTable/StateTable";
import ChoiceSelector from "../Cards/ChoiceSelector";
import { fetchUserFavorites } from "../../redux/favoriteSlice";

const horse1 =
  "https://res.cloudinary.com/dqacezsc5/image/upload/v1754638706/banner-horse1_g47fn6.png";

const horse2 =
  "https://res.cloudinary.com/dqacezsc5/image/upload/v1754638706/banner-horse2_xmsqzr.jpg";

const horse3 =
  "https://res.cloudinary.com/dqacezsc5/image/upload/v1754638705/banner-horse3_dtnhjh.jpg";

const HomeSection = () => {
  const images = [horse1, horse2, horse3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [showAllFavorites, setShowAllFavorites] = useState(false);

  const dispatch = useDispatch();
  const { combos, loading, error } = useSelector((state) => state.overdue);
  const { favoritesList } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.auth);

  // 🔹 ADDED – Quick Stats Redux state
  const {
    data: quickStats,
    loading: qsLoading,
    error: qsError,
  } = useSelector((state) => state.quickStats);
  const kenoFavorites =
    favoritesList?.filter((f) => f.gameType === "KENO") || [];

  const visibleFavorites = showAllFavorites
    ? kenoFavorites
    : kenoFavorites.slice(0, 4);

  // API call on load
  // useEffect(() => {
  //   dispatch(fetchOverdueCombos());
  //   dispatch(fetchQuickStats());

  //   if (user?.id) {
  //     dispatch(fetchUserFavorites(user.id));   // 👈 ADD
  //   }
  // }, [dispatch, user]);

  useEffect(() => {
  dispatch(fetchOverdueCombos());
  dispatch(fetchQuickStats());
}, [dispatch]);

useEffect(() => {
  if (user?.id) {
    dispatch(fetchUserFavorites(user.id));
  }
}, [dispatch, user?.id]);



  // Slider autoscroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const columns = [
    "Number",
    "Entries",

    "Win %",
    "Last Win",
    "Total Games",
  ];


  // ❌ ORIGINAL DUMMY DATA (UNCHANGED)
  const data = Array.from({ length: 12 }, (_, i) => ({
    rowData: [
      <span
        className={`px-3 py-1 rounded text-white ${[
            "bg-red-700",
            "bg-black",
            "border border-white text-white",
            "bg-blue-800",
            "bg-green-500",
            "bg-green-900",
            "bg-blue-400",
            "bg-pink-400",
            "bg-green-700",
            "bg-red-500",
            "bg-orange-500",
            "bg-blue-300",
          ][i]
          }`}
      >
        {i + 1}
      </span>,
      "4",
      "3",
      "40%",
      "12",
      "550",
    ],
  }));
//   const horseImages = [
//   "/image/1.jpeg",
//   "/image/2.jpeg",
//   "/image/3.jpeg",
//   "/image/4.jpeg",
//   "/image/5.jpeg",
//   "/image/6.jpeg",
//   "/image/7.jpeg",
//   "/image/8.jpeg",
//   "/image/9.jpeg",
//   "/image/10.jpeg",
//   "/image/11.jpeg",
//   "/image/12.jpeg",
// ];


  //  ADDED – API data mapping (new variable only)
// const apiTableData =
//   quickStats
//     ?.slice(0, 12)
//     ?.map((item, i) => ({
//       rowData: [
//         <img
//           src={horseImages[i]}
//           alt={`Horse ${item.number}`}
//           className="w-10 h-10 "
//         />,

//         item.entries,
       
//         `${item.winPercent}%`,
//         item.lastSeen ?? "-",
//         item.totalRaces,
//       ],
//     })) || [];



const numberColors = [
  "bg-red-700",
  "bg-black",
  "border border-white text-white",
  "bg-blue-800",
  "bg-green-500",
  "bg-green-900",
  "bg-blue-400",
  "bg-pink-400",
  "bg-green-700",
  "bg-red-500",
  "bg-orange-500",
  "bg-blue-300",
];
const getNumberColor = (index) =>
  index % 2 === 0 ? "bg-red-600" : "bg-blue-600";

const apiTableData =
  quickStats?.map((item, i) => {
    const num = item.number ?? i + 1;
    const colorClass = num <= 40 ? "bg-red-600" : "bg-blue-600";

    return {
      rowData: [
        <span
          className={`px-3 py-1 rounded text-white ${colorClass}`}
        >
          {num}
        </span>,
        item.entries,
        `${item.winPercent}%`,
        item.lastSeen ?? "-",
        item.totalRaces,
      ],
    };
  }) || [];



  const cards = [
    {
      stats: [
        { label: "Win", value: "4 times" },
        { label: "Quinella", value: "6 times" },
        { label: "Trifecta", value: "9 times" },
      ],
    },
  ];

  const repeatCount = 4;

  return (
    <div className="relative flex flex-col bg-[#262626] px-4 sm:px-6 md:px-8 py-4 my-4 rounded font-poppins">
      <h3 className="text-lg sm:text-xl font-semibold mb-4">Offers we had</h3>

      {/* Slider */}
      <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5] lg:aspect-[16/4] overflow-hidden rounded-2xl">
        <img
          src={images[currentIndex]}
          alt="Slide"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 sm:left-6 transform -translate-y-1/2 text-white text-xl sm:text-2xl bg-black/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full hover:bg-black/70 z-10"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 sm:right-6 transform -translate-y-1/2 text-white text-xl sm:text-2xl bg-black/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full hover:bg-black/70 z-10"
        >
          &#10095;
        </button>
      </div>
      <div className="bg-[#262626] mt-6 rounded-md">
   <ChoiceSelector />

        {/* QUICK STATS */}
        <div className="bg-[#1D1D1D] mt-4 rounded-xl">
          <h3 className="text-lg sm:text-xl font-semibold px-4 sm:px-7 pt-4 bg-[#0A0A0A] rounded-t-xl">
            Quick Stats
          </h3>

          {qsLoading && (
            <p className="text-gray-400 text-sm p-4">
              Loading quick stats...
            </p>
          )}

          {qsError && (
            <p className="text-red-400 text-sm p-4">{qsError}</p>
          )}

          {!qsLoading && !qsError && (
            <StateTable columns={columns} data={apiTableData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
