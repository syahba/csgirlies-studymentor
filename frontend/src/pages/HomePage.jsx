import Navbar from "../components/common/Navbar.jsx";
import PrimaryButton from "../components/common/PrimaryButton.jsx";
import SummaryCard from "../components/quiz/SummaryCard.jsx";

function HomePage() {
  return (
    <div className="bg-linear-to-tr from-[var(--darker-secondary)] to-[var(--secondary)] h-screen w-screen  ">
      <Navbar accentColor={"orange"}></Navbar>

      <div className="flex flex-col items-center mt-3">
        <div className="flex items-center justify-between w-full px-32">
          <h1 className="text-[var(--neutral)]">
            Previous Topic’s{" "}
            <span className="text-[var(--darker-primary)]">Summaries</span>
          </h1>
          <PrimaryButton
            isBig={true}
            text={"Prepare for Exam"}
            bgColor={"orange"}
          ></PrimaryButton>
        </div>

        <div className="flex gap-6 flex-wrap justify-center mt-4 mb-6">
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
