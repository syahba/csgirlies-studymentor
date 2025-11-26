import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../components/common/PrimaryButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { downloadPdf } from "../redux/slices/sessionSlice";
import { mentorColorMap } from "../utils/mentorColors";

function SummaryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const roomName = localStorage.getItem("lastRoom");
  // Grab selected mentor from Redux
  const mentorId = localStorage.getItem("lastMentor");;
  const color = mentorColorMap[mentorId];
  console.log(mentorId);

  // Match gradient + icon color styling logic
  let gradient, iconColor;
  if (color === "light-yellow") {
    gradient = "from-[var(--lighter-accent-1)] to-[var(--accent-1)]";
    iconColor = "var(--black)";
  } else if (color === "purple") {
    gradient = "from-[var(--lighter-accent-2)] to-[var(--accent-2)]";
    iconColor = "var(--darker-accent-2)";
  } else {
    gradient = "from-[var(--lighter-accent-3)] to-[var(--accent-3)]";
    iconColor = "var(--black)";
  }

  return (
    <div className={`bg-linear-to-tr ${gradient} min-h-screen`}>
      <Navbar accentColor={color} />

      <div className="flex flex-col gap-4 mt-2">
        <div className="flex justify-around">
          <PrimaryButton
            isBig={true}
            text={"Download Summary"}
            bgColor={color}
            onClick={() => dispatch(downloadPdf(roomName))}
          />

          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            onClick={() => navigate("/")}
            style={{
              color: iconColor,
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
