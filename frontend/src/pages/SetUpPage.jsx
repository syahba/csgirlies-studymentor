import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/common/Navbar";
import {
  faAngleLeft,
  faAngleRight,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../components/common/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SetUpPage() {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(0);

  const mentors = [
    {
      name: "Mr. Abdul",
      title: "The Supportive Teacher",
      description:
        "Mr. Abdul is a gentle, kind, and encouraging teacher who bla bla bla bla bla bla bla",
      color: "purple",
    },
    {
      name: "Coach Brian",
      title: "The Strict Coach",
      description:
        "Mr. Abdul is a gentle, kind, and encouraging teacher who bla bla bla bla bla bla bla",
      color: "light-yellow",
    },
    {
      name: "Ms. Carson",
      title: "The Chaotic Bestie",
      description:
        "Mr. Abdul is a gentle, kind, and encouraging teacher who bla bla bla bla bla bla bla",
      color: "black",
    },
  ];

  // Determine styles based on current mentor
  let linearGradient;
  let textColor;
  let outlineColor;
  let bgColor;
  let bgIconColor;
  let iconColor;
  let smallTextColor;
  let labelColor;

  if (mentor == 0) {
    linearGradient = "from-[var(--lighter-accent-2)] to-[var(--accent-2)]";
    textColor = "text-[var(--darker-accent-2)]";
    outlineColor = "outline-[var(--darker-accent-2)]";
    bgColor = "bg-[var(--darker-accent-2)]";
    bgIconColor = "var(--darker-accent-2)";
    iconColor = "var(--lighter-accent-2)";
    smallTextColor = "text-[var(--accent-2)]";
    labelColor = "text-[var(--neutral)]";
  } else if (mentor == 1) {
    linearGradient = "from-[var(--lighter-accent-1)] to-[var(--accent-1)]";
    textColor = "text-[var(--darker-secondary)]";
    outlineColor = "outline-[var(--darker-secondary)]";
    bgColor = "bg-[var(--darker-secondary)]";
    bgIconColor = "var(--darker-secondary)";
    iconColor = "var(--black)";
    smallTextColor = "text-[var(--accent-1)]";
    labelColor = "text-[var(--black)]";
  } else {
    linearGradient = "from-[var(--lighter-accent-3)] to-[var(--accent-3)]";
    textColor = "text-[var(--black)]";
    outlineColor = "outline-[var(--black)]";
    bgColor = "bg-[var(--black)]";
    bgIconColor = "var(--black)";
    iconColor = "var(--lighter-accent-3)";
    smallTextColor = "text-[var(--accent-3)]";
    labelColor = "text-[var(--neutral)]";
  }

  // Handlers for mentor navigation
  const nextHandler = () => {
    setMentor((prev) => (prev + 1) % mentors.length);
  };

  const prevHandler = () => {
    setMentor((prev) => (prev - 1 + mentors.length) % mentors.length);
  };

  return (
    <div className={`bg-linear-to-tr ${linearGradient} min-h-screen`}>
      <Navbar accentColor={mentors[mentor].color}></Navbar>

      <div className="flex flex-col justify-center">
        <h2 className="text-[var(--neutral)] text-center">
          What do you want to <span className={textColor}>learn</span> today?
        </h2>

        <div className="flex flex-row-reverse items-center justify-center gap-16 mt-7">
          <div className="bg-[var(--neutral)] w-96 h-96 rounded-full"></div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 bg-[var(--neutral)] p-5 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)]">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="topic"
                  className="text-[var(--black)] text-body font-bold"
                >
                  What topic should we discuss?
                </label>
                <input
                  type="text"
                  id="topic"
                  placeholder="Enter a topic here"
                  className={`text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl ${outlineColor} shadow-[4px_4px_12px_rgba(0,0,0,0.1)]`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="document"
                  className="text-[var(--black)] text-body font-bold"
                >
                  Any specific materials you’d like to use?
                </label>
                <input
                  type="file"
                  id="document"
                  className={`${labelColor} ${bgColor} py-2 px-4 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)] cursor-pointer`}
                />
              </div>
            </div>

            <div>
              <div className="bg-[var(--neutral)] p-5 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)] mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-[var(--black)]">{mentors[mentor].name}</h3>
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    size="xs"
                    style={{
                      color: iconColor,
                      backgroundColor: bgIconColor,
                      padding: "5.5px 4px",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <p className={`text-body font-bold ${smallTextColor}`}>
                  {mentors[mentor].title}
                </p>

                <p className="text-body text-[var(--black)] max-w-96">
                  {mentors[mentor].description}
                </p>
              </div>

              <div className="flex items-center justify-center gap-8">
                <button
                  onClick={prevHandler}
                  className="hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer rounded-full"
                >
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    style={{
                      color: "#000043",
                      backgroundColor: "var(--neutral)",
                      padding: "5.5px 4px",
                      borderRadius: "50%",
                      boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                </button>

                <button
                  onClick={nextHandler}
                  className="hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer rounded-full"
                >
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    style={{
                      color: "#000043",
                      backgroundColor: "var(--neutral)",
                      padding: "5.5px 4px",
                      borderRadius: "50%",
                      boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row-reverse gap-4 mr-12">
          <PrimaryButton
            isBig={true}
            text={"Start the Session"}
            bgColor={mentors[mentor].color}
            onClick={() => navigate("/session/1")}
            isSubmit={true}
          ></PrimaryButton>
          <SecondaryButton
            text={"Back"}
            onClick={() => navigate("/")}
            outlineColor={outlineColor}
          ></SecondaryButton>
        </div>
      </div>
    </div>
  );
}

export default SetUpPage;
