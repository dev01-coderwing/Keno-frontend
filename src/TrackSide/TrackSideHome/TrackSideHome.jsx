import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFavorites } from "../../redux/favoriteSlice";
import { fetchTracksideQuickStats } from "../../redux/tracksideQuickStatsSlice";
import SubscriptionGuard from "../../Component/SubscriptionGuard";

import TracksideStateTable from "./TracksideStateTable";
import TrackSideChoiceSelector from "../TrackSideAnalyticsSection/TrackSideChoiceSelector";
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

  const dispatch = useDispatch();
  const { favoritesList, loading } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.auth);
  console.log("USER 👉", user);

  console.log("FAVORITES STATE 👉", favoritesList);

  // API call on load
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserFavorites(user.id));
    }
  }, [dispatch, user?.id]);


  const {
    data: tracksideStats,
    loading: tsLoading,
    error: tsError,
  } = useSelector((state) => state.tracksideQuickStats);
  useEffect(() => {
    dispatch(fetchTracksideQuickStats());
  }, [dispatch]);

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

  console.log("TRACKSIDE STATE 👉", tracksideStats);
  console.log("LOADING 👉", tsLoading);
  console.log("ERROR 👉", tsError);

  const columns = [
    "Horse",
    "Total Games",
    "Total Hits",
    "Current Drought",
    "Avg Drought",
    "Longest Drought",
    "Last 5 Races",
  ];



  // const data = Array.from({ length: 12 }, (_, i) => ({
  //   rowData: [
  //     <span
  //       className={`px-3 py-1 rounded text-white ${
  //         [
  //           "bg-red-700",
  //           "bg-black",
  //           "border border-white text-white",
  //           "bg-blue-800",
  //           "bg-green-500",
  //           "bg-green-900",
  //           "bg-blue-400",
  //           "bg-pink-400",
  //           "bg-green-700",
  //           "bg-red-500",
  //           "bg-orange-500",
  //           "bg-blue-300",
  //         ][i]
  //       }`}
  //     >
  //       {i + 1}
  //     </span>,
  //     "4",
  //     "3",
  //     "40%",
  //     "12",
  //     "550",
  //   ],
  // }));


  const horseImages = [
    "/image/1.jpeg",
    "/image/2.jpeg",
    "/image/3.jpeg",
    "/image/4.jpeg",
    "/image/5.jpeg",
    "/image/6.jpeg",
    "/image/7.jpeg",
    "/image/8.jpeg",
    "/image/9.jpeg",
    "/image/10.jpeg",
    "/image/11.jpeg",
    "/image/12.jpeg",
  ];

  const apiTableData = tracksideStats.map((item, i) => ({
    rowData: [
      <img
        src={horseImages[i]}
        className="w-10 h-10"
      />,
      item.totalGames,
      item.totalHits,
      item.currentDrought,
      item.averageDrought,
      item.longestDrought,
      item.last5Results.length,
    ],
    expandedData: item.last5Results,
  }));




  return (
    <>
      <TrackSideLayout>
        <SubscriptionGuard>
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
              <div className="mb-4">
                <TrackSideChoiceSelector />
              </div>

              {/* QUICK STATS */}
              <div className="bg-[#1D1D1D] mt-4 rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold px-4 sm:px-7 pt-4 bg-[#0A0A0A] rounded-t-xl">
                  Quick Stats
                </h3>
                {tsLoading && <p className="text-gray-400 p-4">Loading...</p>}
                {tsError && <p className="text-red-400 p-4">{tsError}</p>}

                {!tsLoading && !tsError && (
                  <TracksideStateTable columns={columns} data={apiTableData} />
                )}

              </div>
            </div>
          </div>
        </SubscriptionGuard>
      </TrackSideLayout>
    </>
  );
}

export default TrackSideHome;











//  {loading && <p className="text-gray-300 text-sm">Loading overdue combos...</p>}
//             {error && <p className="text-red-400 text-sm">Error: {error}</p>}

//             {!loading && combos?.data?.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
//                 {combos.data.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-[#0A0A0A] p-3 rounded-xl border border-gray-700"
//                   >
//                     <p className="text-white text-lg font-semibold">
//                       {item.combination}
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       Occurrences: {item.occurrences}
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       Last Seen: {item.lastSeenRacesAgo} races ago
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}