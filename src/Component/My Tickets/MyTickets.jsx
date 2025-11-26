import React, { useState } from "react";
import ResultInput from "../ResultSection/ResultInput";
import Entries from "../Cards/Entries";
import ResultExpandable from "../ResultSection/ResultExpandable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../CustomDatePicker.css";
import { PiCalendarDotsBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../../redux/ticketSlice";

const mapBetTypeForApi = (v) => {
  switch (v) {
    case "quinella":
      return "Quinella";
    case "trifecta":
      return "Trifectra";
    case "first-four":
      return "First Four";
    default:
      return v;
  }
};

const MyTickets = () => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const { loading, error, ticket, success } = useSelector((state) => state.tickets || state.ticket || {});

  const [formData, setFormData] = useState({
    firstRace: "",
    lastRace: "",
    amount: "",
    payout: "",
    betType: "default",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Current formData:", formData);

    if (
      !date ||
      formData.firstRace === "" ||
      formData.lastRace === "" ||
      formData.amount === "" ||
      formData.payout === "" ||
      formData.betType === "default"
    ) {
      alert("⚠️ Please fill all fields and select a valid Bet Type.");
      return;
    }

    if (entries.length === 0 || entries.some((entry) => entry.numbers.length === 0)) {
      alert("⚠️ Please select at least one number for each entry.");
      return;
    }

    const firstNo = Number(formData.firstRace);
    const lastNo = Number(formData.lastRace);
    const amount = Number(formData.amount);
    const payout = Number(formData.payout);

    if (
      !Number.isFinite(firstNo) ||
      !Number.isFinite(lastNo) ||
      !Number.isFinite(amount) ||
      !Number.isFinite(payout)
    ) {
      alert("⚠️ Please enter valid numbers.");
      return;
    }

    const ticketData = {
      date: date.toISOString().split("T")[0],
      firstGameNo: firstNo,
      lastGameNo: lastNo,
      amountSpent: amount,
      payoutPercent: payout,
      betType: mapBetTypeForApi(formData.betType),
      entries,
    };

    console.log("Submitting Ticket:", ticketData);

    try {
      const res = await dispatch(createTicket(ticketData)).unwrap();
      console.log("✅ Ticket Created:", res);
      alert("🎉 Ticket created successfully!");
      // Reset form after successful submission
      setFormData({
        firstRace: "",
        lastRace: "",
        amount: "",
        payout: "",
        betType: "default",
      });
      setEntries([]);
      setDate(null);
    } catch (err) {
      console.error("❌ Ticket Error:", err);
      alert(`❌ Ticket creation failed: ${err}`);
    }
  };

  const getEntryCount = () => {
    switch (formData.betType.toLowerCase()) {
      case "quinella":
        return 2;
      case "trifecta":
        return 3;
      case "first four":
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="bg-[#1E1E1E] text-white min-h-screen px-4 md:px-8 py-10 font-poppins">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">My Tickets</h2>
      <p className="text-base md:text-lg mb-8">Enter your ticket’s details -</p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl w-full">
        {/* Date */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="w-full md:w-40 text-base md:text-lg font-medium">
            Date :
          </label>
          <div className="relative w-full md:w-[44%]">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="bg-[#464646] text-[#c8c8c8] w-full text-sm px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <PiCalendarDotsBold />
              {date ? date.toDateString() : "Date"}
            </button>

            {open && (
              <div className="absolute top-full left-0 mt-2 z-50 shadow-lg">
                <DatePicker
                  selected={date}
                  onChange={(d) => {
                    setDate(d);
                    setOpen(false);
                  }}
                  inline
                />
              </div>
            )}
          </div>
        </div>

        {/* Race Range */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label className="w-full md:w-40 text-base md:text-lg font-medium">
            Race no. range :
          </label>
          <div className="flex flex-col gap-1 sm:flex-row w-full md:max-w-[45%]">
            <ResultInput
              placeholder="First Game No."
              type="number"
              required
              width="w-full sm:w-1/2 lg:ml-2 md:ml-2"
              name="firstRace"
              value={formData.firstRace}
              onChange={handleChange}
            />
            <ResultInput
              placeholder="Last Game No."
              type="number"
              required
              width="w-full sm:w-1/2"
              name="lastRace"
              value={formData.lastRace}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="w-full md:w-40 text-base md:text-lg font-medium">
            Amount spent :
          </label>
          <ResultInput
            placeholder="$ 500.63"
            type="number"
            required
            width="w-full md:w-[44%]"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>

        {/* Payout */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="w-full md:w-40 text-base md:text-lg font-medium">
            Payout % :
          </label>
          <ResultInput
            placeholder="45.36 %"
            type="number"
            required
            width="w-full md:w-[44%]"
            name="payout"
            value={formData.payout}
            onChange={handleChange}
          />
        </div>

        {/* Bet Type */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label className="w-full md:w-40 text-base md:text-lg font-medium">
            Bet Type :
          </label>
          <select
            className="bg-[#464646] w-full md:w-[44%] py-3 rounded-lg text-sm text-center"
            name="betType"
            value={formData.betType}
            onChange={handleChange}
          >
            <option value="default">Select</option>
            <option value="quinella">Quinella</option>
            <option value="trifecta">Trifecta</option>
            <option value="first-four">First Four</option>
          </select>
        </div>

        {/* Entries */}
        <div className="mt-10 w-full max-w-4xl">
          <h5 className="text-lg md:text-xl font-semibold mb-2">
            Select your entries
          </h5>
          <Entries count={getEntryCount()} onEntriesChange={setEntries} />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-white px-8 py-3 rounded-lg text-black font-semibold hover:bg-gray-200 transition"
          >
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center">
            Error: {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}
        {/* Success Message */}
        {success && (
          <p className="text-green-400 text-center">
             Ticket Created Successfully!
          </p>
        )}
      </form>

      {/* Results Section */}
      <div className="w-full">
        <h3 className="text-lg md:text-xl font-semibold p-4">Results:</h3>
        <div className="mt-4 rounded overflow-x-auto">
          {loading ? (
            <p className="text-white">Loading results...</p>
          ) : (
            <ResultExpandable resultData={results} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
