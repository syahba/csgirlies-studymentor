import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/common/Navbar";
import {
  faEye,
  faMicrophone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../components/common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { mentorColorMap } from "../utils/mentorColors";

function StudyPage() {
  const navigate = useNavigate();

  // Get selected mentor ID from Redux
  const mentorId = localStorage.getItem("lastMentor");;
  const color = mentorColorMap[mentorId];

  // Convert mentor color name → actual UI colors
  let gradient, iconColor;
  if (color === "light-yellow") {
    gradient = "from-[var(--lighter-accent-1)] to-[var(--accent-1)]";
    iconColor = "#403D44";
  } else if (color === "purple") {
    gradient = "from-[var(--lighter-accent-2)] to-[var(--accent-2)]";
    iconColor = "var(--darker-accent-2)";
  } else {
    gradient = "from-[var(--lighter-accent-3)] to-[var(--accent-3)]";
    iconColor = "var(--black)";
  }

  return (
    <div className={`bg-linear-to-tr ${gradient} min-h-screen`}>
      {/* navbar styled dynamically */}
      <Navbar accentColor={color}></Navbar>

      <div className="flex flex-col gap-8 mt-2">
        <div className="flex justify-around">
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon={faEye}
              size="lg"
              style={{
                color: iconColor,
                backgroundColor: "var(--neutral)",
                padding: "6.5px 5px",
                borderRadius: "50%",
                boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            />
            <FontAwesomeIcon
              icon={faMicrophone}
              size="lg"
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

          <FontAwesomeIcon
            icon={faXmark}
            size="lg"
            style={{
              color: iconColor,
              backgroundColor: "var(--neutral)",
              padding: "6.5px 5px",
              borderRadius: "50%",
              boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
        </div>

        <div className="flex justify-center items-center gap-20">
          <div className="flex flex-col items-center justify-center gap-8">
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

          <div className="flex flex-col items-end">
            <div className="w-[30rem] max-h-[30rem] overflow-auto bg-[var(--neutral)] p-6 shadow-[4px_4px_12px_rgba(0,0,0,0.1)] rounded-3xl text-body text-[var(--black)]">
              <p className="mb-4">
                Thank you for explaining! From what you shared, you already
                understand the basic idea of an ecosystem — especially how
                living things interact with their environment. That’s a really
                solid start ✨{" "}
              </p>
              <p className="">Here are the parts you explained well: </p>
              <ol>
                <li>
                  You recognized that an ecosystem includes biotic and abiotic
                  components
                </li>
                <li>
                  You mentioned that organisms depend on each other for survival
                </li>
                <li>
                  You identified simple examples like food relationships in
                  nature 🌱
                </li>
              </ol>
              <p className="mt-4">
                And here are a few areas we can strengthen together:
              </p>
              <ol>
                <li>
                  How energy flows through an ecosystem (producers → consumers →
                  decomposers)
                </li>
                <li>The difference between food chains vs. food webs</li>
                <li>
                  {" "}
                  How changes in one population can affect the entire ecosystem
                  balance
                </li>
                <li>
                  The idea of trophic levels and how energy decreases at each
                  level
                </li>
              </ol>
              <p className="mt-4">Let me explain one of them clearly:</p>
              <p>
                {" "}
                Energy in an ecosystem always starts with the sun, which plants
                (producers) convert into energy. Herbivores eat the plants,
                carnivores eat the herbivores, and decomposers break everything
                down — returning nutrients to the soil. Each step is a trophic
                level, and energy drops as it moves up.
              </p>
            </div>
            <div className="mt-6 mb-10">
              <PrimaryButton
                isBig={true}
                text={"Re-explain"}
                bgColor={color}
              ></PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyPage;
