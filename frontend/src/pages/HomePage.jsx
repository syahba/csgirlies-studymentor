import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/common/Navbar.jsx";
import PrimaryButton from "../components/common/PrimaryButton.jsx";
import SessionCard from "../components/common/SessionCard.jsx";
import { fetchStudySessions } from "../redux/slices/studySessionsSlice";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sessions, loading, error } = useSelector((state) => state.studySessions);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchStudySessions(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="bg-linear-to-tr from-[var(--darker-secondary)] to-[var(--secondary)] min-h-screen">
      <Navbar accentColor={"orange"}></Navbar>

      <div className="flex flex-col items-center justify-center mt-3">
        <div className="flex items-center justify-evenly w-full">
          <h2 className="text-[var(--neutral)]">
            Previous Topic's{" "}
            <span className="text-[var(--darker-primary)]">Summaries</span>
          </h2>
          <PrimaryButton
            isBig={true}
            text={"Prepare for Exam"}
            bgColor={"orange"}
            onClick={() => navigate("/session/setup")}
          ></PrimaryButton>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center mt-4 mb-6 max-w-7xl px-4">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="text-[var(--neutral)] text-lg">Loading sessions...</div>
            </div>
          ) : error ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="text-red-400 text-lg">Error loading sessions: {error}</div>
            </div>
          ) : sessions.length === 0 ? (
            <div className="col-span-full flex flex-col justify-center items-center py-12">
              <div className="text-[var(--neutral)] text-xl mb-2">Nothing to display</div>
              <div className="text-[var(--neutral)] text-sm opacity-75">
                Start your first study session to see summaries here!
              </div>
            </div>
          ) : (
            sessions.map((session) => (
              <SessionCard key={session.room_name} session={session} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
