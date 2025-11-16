import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../components/common/PrimaryButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/common/Navbar";
import { useNavigate } from "react-router-dom";

function SummaryPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-tr from-[var(--lighter-accent-2)] to-[var(--accent-2)] min-h-screen">
      <Navbar accentColor={"purple"}></Navbar>

      <div className="flex flex-col gap-4 mt-2">
        <div className="flex justify-around">
          <PrimaryButton
            isBig={true}
            text={"Download Summary"}
            bgColor={"purple"}
            onClick={() => navigate('/')}
          ></PrimaryButton>

          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            style={{
              color: "#4f4ca0",
              backgroundColor: "var(--neutral)",
              padding: "6.5px 5px",
              borderRadius: "50%",
              boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-6 mb-8">
            <div className="bg-[var(--neutral)] w-[26rem] h-[26rem] rounded-full"></div>
            <div className="text-[var(--neutral)] flex flex-col justify-center items-center gap-1 text-caption">
              <p className="bg-[var(--black)]/50 px-2">
                Hi, Joe! Ready to study some ecosystems? Why dont you tell me
              </p>
              <p className="bg-[var(--black)]/50 px-2">
                more about what you’ve learned so far?
              </p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default SummaryPage;
