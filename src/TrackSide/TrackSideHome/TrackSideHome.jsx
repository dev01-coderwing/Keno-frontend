import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchOverdueCombos } from "../../redux/overdueSlice";  // ⬅️ API comment

import RaceCard from "../../Component/Cards/RaceCard";
import StateTable from "../../Component/StateTable/StateTable";
import ChoiceSelector from "../../Component/Cards/ChoiceSelector";
import TrackSideLayout from '../TrackSideLayout/TrackSideLayout';
const horse1 =
  "https://res.cloudinary.com/dqacezsc5/image/upload/v1754638706/banner-horse1_g47fn6.png";

const horse2 =
  "https://res.cloudinary.com/dqacezsc5/image/upload/v1754638706/banner-horse2_xmsqzr.jpg";

const horse3 =
  "https://res.cloudinary.com/dqacezsc5/image/upload/v1754638705/banner-horse3_dtnhjh.jpg";

function TrackSideHome() {
  const images = [horse1, horse2, horse3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);

  const dispatch = useDispatch();
  const { combos, loading, error } = useSelector((state) => state.overdue);

  // API call on load
  // useEffect(() => {
  //   dispatch(fetchOverdueCombos());   // ⬅️ API call commented
  // }, [dispatch]);

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
    "Entries",
    "Win",
    "Place",
    "Win %",
    "Last Win",
    "Total Races",
  ];

  const data = Array.from({ length: 12 }, (_, i) => ({
    rowData: [
      <span
        className={`px-3 py-1 rounded text-white ${
          [
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
    <>
    <TrackSideLayout>
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

        {/* Favorite Number */}
        <div className="bg-[#262626] mt-6 rounded-md">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-[#1D1D1D] p-4 rounded-t-xl gap-2">
            <h2 className="text-lg sm:text-xl font-semibold">Favorite Number</h2>
            <button
              onClick={() => setShowChoices(!showChoices)}
              className="px-3 py-1.5 border border-[#D3D3D3] rounded-lg text-sm hover:bg-[#333] transition"
            >
              {showChoices ? "Hide" : "Show More"}
            </button>
          </div>

          {showChoices && (
            <div className="absolute right-12 w-full max-w-xs z-50 rounded-l-xl shadow-lg">
              <ChoiceSelector />
            </div>
          )}

          {/* Overdue Combos */}
          <div className="p-4 bg-[#1D1D1D] rounded-b-xl">
            {loading && <p className="text-gray-300 text-sm">Loading overdue combos...</p>}
            {error && <p className="text-red-400 text-sm">Error: {error}</p>}

            {!loading && combos?.data?.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                {combos.data.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0A0A0A] p-3 rounded-xl border border-gray-700"
                  >
                    <p className="text-white text-lg font-semibold">
                      {item.combination}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Occurrences: {item.occurrences}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Last Seen: {item.lastSeenRacesAgo} races ago
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Race Cards */}
            <div className="relative p-4 bg-[#1D1D1D] pt-0 rounded-b-xl">
              <button
                onClick={() => {
                  const container = document.getElementById("racecard-scroll");
                  container.scrollBy({ left: -300, behavior: "smooth" });
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
              >
                &#10094;
              </button>

              <button
                onClick={() => {
                  const container = document.getElementById("racecard-scroll");
                  container.scrollBy({ left: 300, behavior: "smooth" });
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 p-2 rounded-full text-white sm:hidden"
              >
                &#10095;
              </button>

              <div
                id="racecard-scroll"
                className="flex gap-4 overflow-x-auto scroll-smooth sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:overflow-visible"
              >
                {[...Array(repeatCount)].map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-72 sm:w-full">
                    <RaceCard stats={cards[0].stats} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="bg-[#1D1D1D] mt-4 rounded-xl">
            <h3 className="text-lg sm:text-xl font-semibold px-4 sm:px-7 pt-4 bg-[#0A0A0A] rounded-t-xl">
              Quick Stats
            </h3>
            <StateTable columns={columns} data={data} />
          </div>
        </div>
      </div>
      </TrackSideLayout>
    </>
  );
}

export default TrackSideHome;
