import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/common/Navbar";
import ProgressBar from "../components/quiz/ProgressBar";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import OptionCard from "../components/quiz/OptionCard";
import PrimaryButton from "../components/common/PrimaryButton";
import { useNavigate } from "react-router-dom";

function QuizPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-tr from-[var(--lighter-accent-2)] to-[var(--accent-2)] min-h-screen">
      <Navbar accentColor={"purple"}></Navbar>

      <div className="flex flex-row-reverse justify-center gap-6 mt-3">
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

        <div className="flex flex-col justify-center items-center gap-8">
          <ProgressBar></ProgressBar>

          <div className="flex flex-col justify-center items-center gap-6">
            <div className="text-[var(--black)] p-5 bg-[var(--neutral)] rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)]">
              <h4>Question 4</h4>
              <p className="text-body max-w-[45rem]">
                In a grassland ecosystem, energy flows from the sun to grasses,
                then to grasshoppers, frogs, snakes, and finally eagles. If
                pesticide usage causes a decline in the grasshopper population,
                which of the following is the MOST likely impact on the rest of
                the food chain?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <OptionCard
                text={
                  "Frogs will increase because they will have more access to other food sources."
                }
              ></OptionCard>
              <OptionCard
                text={
                  "Frogs will increase because they will have more access to other food sources."
                }
              ></OptionCard>
              <OptionCard
                text={
                  "Frogs will increase because they will have more access to other food sources."
                }
              ></OptionCard>
              <OptionCard
                text={
                  "Frogs will increase because they will have more access to other food sources."
                }
              ></OptionCard>
            </div>
          </div>

          <div className="mt-2 flex justify-between items-end w-full mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--neutral)] w-44 h-44 rounded-full"></div>
              {/* <div className="bg-[var(--neutral)] rounded-2xl px-3 py-2 rounded-bl-none shadow-[4px_4px_16px_rgba(0,0,0,0.1)] max-w-80 max-h-32">
                <p className="text-body text-[var(--black)]">
                  Correct! Well done. You recognized how a small change in the
                  population at one trophic level can affect higher levels.
                </p>
              </div> */}
            </div>
            <PrimaryButton
              bgColor={"purple"}
              text={"Answer"}
              isBig={true}
              isSubmit={true}
              onClick={() => navigate("/session/:id/summary")}
            ></PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
