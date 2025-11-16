import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/common/Navbar.jsx";
import PrimaryButton from "../components/common/PrimaryButton.jsx";
import SummaryCard from "../components/quiz/SummaryCard.jsx";
import { downloadPdf, getSessions } from "../redux/slices/sessionSlice.js";
import { formatTopicName } from "../utils/getTopicName.js";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storageKey = "registerStatus";

  // get user info & session history
  const { userId, school } = useSelector((state) => state.user);
  const { summaryHistories } = useSelector((state) => state.session);
  const registerStatus = JSON.parse(localStorage.getItem(storageKey));

  // redirect if user has not registered
  useEffect(() => {
    if (!registerStatus) {
      navigate("/register");
    }
  }, [registerStatus, navigate]);

  // fetch previous sessions once userId is available
  useEffect(() => {
    if (userId) {
      dispatch(getSessions(userId));
    }
  }, [userId, dispatch]);

  return (
    <div className="bg-linear-to-tr from-[var(--darker-secondary)] to-[var(--secondary)] min-h-screen">
      <Navbar accentColor={"orange"}></Navbar>

      <div className="flex flex-col items-center justify-center mt-3">
        {/* Header and Start Session button */}
        <div className="flex items-center justify-evenly w-full">
          <h2 className="text-[var(--neutral)]">
            Previous Topic’s{" "}
            <span className="text-[var(--darker-primary)]">Summaries</span>
          </h2>
          <PrimaryButton
            isBig={true}
            text={"Prepare for Exam"}
            bgColor={"orange"}
            onClick={() => navigate("/session/setup")}
          ></PrimaryButton>
        </div>

        {/* SESSION HISTORY CARDS */}
        <div className="grid gap-6 grid-cols-3 justify-center mt-4 mb-6">
          {summaryHistories?.data?.length > 0 ? (
            summaryHistories.data.map((session, idx) => (
              <SummaryCard
                key={idx}
                date={session.date}
                topic={formatTopicName(session.room_name)}
                school={school}
                onClick={() => dispatch(downloadPdf(session.room_name))}
              />
            ))
          ) : (
            <h4 className="text-[var(--neutral)] col-span-3 mt-8">
              No previous sessions yet. Start learning!
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
