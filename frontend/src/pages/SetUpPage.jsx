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

function SetUpPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-tr from-[var(--lighter-accent-2)] to-[var(--accent-2)] min-h-screen">
      <Navbar accentColor={"blue"}></Navbar>

      <div className="flex flex-col justify-center">
        <h2 className="text-[var(--neutral)] text-center">
          What do you want to{" "}
          <span className="text-[var(--darker-accent-2)]">learn</span> today?
        </h2>

        <div className="flex flex-row-reverse items-center justify-center gap-16 mt-7">
          <div className="bg-[var(--neutral)] w-96 h-96 rounded-full"></div>

          <div className="flex flex-col gap-6">
            <div
              className="flex flex-col gap-4 bg-[var(--neutral)] p-5 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)]"
            >
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
                  className="text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl outline-[var(--accent-2)] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]"
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
                  className="text-[var(--neutral)] bg-[var(--darker-accent-2)] py-2 px-4 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)] cursor-pointer"
                />
              </div>
            </div>

            <div>
              <div className="bg-[var(--neutral)] p-5 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)] mb-4">
                <div className="flex items-center gap-3">
                  <h3>Mr. Abdul</h3>
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    size="xs"
                    style={{
                      color: "#fee1f8",
                      backgroundColor: "var(--darker-accent-2)",
                      padding: "5.5px 4px",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <p className="text-body font-bold text-[var(--accent-2)]">
                  “The Supportive Teacher”
                </p>

                <p className="text-body text-[var(--black)] max-w-96">
                  Mr. Abdul is a gentle, kind, and encouraging teacher who bla
                  bla bla bla bla bla bla
                </p>
              </div>

              <div className="flex items-center justify-center gap-8">
                <button className="hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer rounded-full">
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

                <button className="hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer rounded-full">
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
            bgColor={"purple"}
            onClick={() => navigate("/session/1")}
            isSubmit={true}
          ></PrimaryButton>
          <SecondaryButton
            text={"Back"}
            onClick={() => navigate("/")}
          ></SecondaryButton>
        </div>
      </div>
    </div>
  );
}

export default SetUpPage;
