import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import PrimaryButton from "../components/common/PrimaryButton.jsx";
import SummaryCard from "../components/quiz/SummaryCard.jsx";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-tr from-[var(--darker-secondary)] to-[var(--secondary)] min-h-sc">
      <Navbar accentColor={"orange"}></Navbar>

      <div className="flex flex-col items-center justify-center mt-3">
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

        <div className="grid gap-6 grid-cols-3 justify-center mt-4 mb-6">
          <SummaryCard isMastered={false}></SummaryCard>
          <SummaryCard isMastered={false}></SummaryCard>
          <SummaryCard isMastered={true}></SummaryCard>
          <SummaryCard isMastered={false}></SummaryCard>
          <SummaryCard isMastered={false}></SummaryCard>
          <SummaryCard isMastered={true}></SummaryCard>
          <SummaryCard isMastered={false}></SummaryCard>
          <SummaryCard isMastered={false}></SummaryCard>
          <SummaryCard isMastered={true}></SummaryCard>
          <SummaryCard isMastered={false}></SummaryCard>
          <SummaryCard isMastered={false}></SummaryCard>
          <SummaryCard isMastered={true}></SummaryCard>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
