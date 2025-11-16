import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import PrimaryButton from "../components/common/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import {
  addFiles,
  removeFiles,
  selectTopic,
  generateRoomName,
  uploadFiles,
  addSession,
  selectMentor,
} from "../redux/slices/setupSlice";

function SetUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const reduxTopic = useSelector((state) => state.setup.input);
  const reduxRoomName = useSelector((state) => state.setup.room_name);
  const reduxUploadedFiles = useSelector((state) => state.setup.uploadedFiles);
  const reduxFilePaths = useSelector((state) => state.setup.file_paths);
  const reduxUserId = useSelector((state) => state.user.userId);

  // If not registered yet, use test fallback
  const userId = reduxUserId || "test-user-1";

  // ui state
  const [mentorIndex, setMentorIndex] = useState(0);

  // replace with real data from api later
  const mentors = [
    {
      id: "mentor_1",
      name: "Mr. Abdul",
      title: "The Supportive Teacher",
      description:
        "Mr. Abdul is a gentle, kind, and encouraging teacher who bla bla bla bla bla bla bla",
      color: "purple",
    },
    {
      id: "mentor_2",
      name: "Coach Brian",
      title: "The Strict Coach",
      description:
        "Mr. Abdul is a gentle, kind, and encouraging teacher who bla bla bla bla bla bla bla",
      color: "light-yellow",
    },
    {
      id: "mentor_3",
      name: "Ms. Carson",
      title: "The Chaotic Bestie",
      description:
        "Mr. Abdul is a gentle, kind, and encouraging teacher who bla bla bla bla bla bla bla",
      color: "black",
    },
  ];

  // mentor carousel
  const nextHandler = () => {
    setMentorIndex((prev) => (prev + 1) % mentors.length);
  };

  const prevHandler = () => {
    setMentorIndex((prev) => (prev - 1 + mentors.length) % mentors.length);
  };

  // topic input (save topic to Redux every keystroke + generate room name onBlur)
  const handleTopicChange = (e) => {
    dispatch(selectTopic(e.target.value));
  };

  const handleTopicBlur = () => {
    if (reduxTopic.trim() !== "") {
      dispatch(generateRoomName(reduxTopic));
    }
  };

  // fil input (add raw File objects + remove file by index
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    dispatch(addFiles(files));
  };

  const handleRemoveFile = (index) => {
    dispatch(removeFiles(index));
  };

  // start session
  const handleStartSession = async () => {
    if (!reduxTopic || reduxTopic.trim() === "") {
      alert("Please enter a topic before starting.");
      return;
    }

    // ensure room name exists
    let finalRoomName = reduxRoomName;
    if (!finalRoomName) {
      dispatch(generateRoomName(reduxTopic));
    }

    // save mentor selection to redux
    dispatch(selectMentor(mentors[mentorIndex].id));

    // upload files (only if user selected any)
    if (reduxUploadedFiles.length > 0) {
      const formData = new FormData();
      formData.append("topic", reduxTopic);

      reduxUploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      await dispatch(uploadFiles(formData, finalRoomName));
    }

    const finalFilePaths = reduxFilePaths || [];

    // add session to backend
    await dispatch(
      addSession({
        userId,
        room_name: finalRoomName,
        file_paths: finalFilePaths,
      })
    );

    navigate(`/session/${finalRoomName}`);
  };

  // styling based on selected mentor
  let linearGradient;
  let textColor;
  let outlineColor;
  let bgColor;
  let bgIconColor;
  let iconColor;
  let smallTextColor;
  let labelColor;

  if (mentorIndex === 0) {
    linearGradient = "from-[var(--lighter-accent-2)] to-[var(--accent-2)]";
    textColor = "text-[var(--darker-accent-2)]";
    outlineColor = "outline-[var(--darker-accent-2)]";
    bgColor = "bg-[var(--darker-accent-2)]";
    bgIconColor = "var(--darker-accent-2)";
    iconColor = "var(--lighter-accent-2)";
    smallTextColor = "text-[var(--accent-2)]";
    labelColor = "text-[var(--neutral)]";
  } else if (mentorIndex === 1) {
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

  return (
    <div className={`bg-linear-to-tr ${linearGradient} min-h-screen`}>
      <Navbar accentColor={mentors[mentorIndex].color}></Navbar>

      <div className="flex flex-col justify-center">
        <h2 className="text-[var(--neutral)] text-center">
          What do you want to <span className={textColor}>learn</span> today?
        </h2>

        <div className="flex flex-row-reverse items-center justify-center gap-16 mt-7">
          <div className="bg-[var(--neutral)] w-96 h-96 rounded-full"></div>

          <div className="flex flex-col gap-6">
            {/* Topic + File Input Box */}
            <div className="flex flex-col gap-4 bg-[var(--neutral)] p-5 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)]">
              {/* Topic Input */}
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
                  value={reduxTopic}
                  onChange={handleTopicChange}
                  onBlur={handleTopicBlur}
                  placeholder="Enter a topic here"
                  className={`text-[var(--black)] bg-[var(--neutral)] py-2 px-4 rounded-3xl ${outlineColor} shadow-[4px_4px_12px_rgba(0,0,0,0.1)]`}
                />
              </div>

              {/* File Input */}
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
                  multiple
                  onChange={handleFileChange}
                  className={`${labelColor} ${bgColor} py-2 px-4 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)] cursor-pointer`}
                />
                {/* FIle Preview */}
                {reduxUploadedFiles.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {reduxUploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-[var(--neutral)] px-4 py-2 rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.1)]"
                      >
                        <p className="text-[var(--black)] text-sm">
                          {file.name}
                        </p>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="text-[var(--error)] text-xs underline hover:opacity-70"
                        >
                          remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mentor Box */}
            <div>
              <div className="bg-[var(--neutral)] p-5 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)] mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-[var(--black)]">
                    {mentors[mentorIndex].name}
                  </h3>
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
                  {mentors[mentorIndex].title}
                </p>

                <p className="text-body text-[var(--black)] max-w-96">
                  {mentors[mentorIndex].description}
                </p>
              </div>

              {/* Mentor navigation buttons */}
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
                      boxShadow: "4px_4px_10px_rgba(0,0,0,0.1)",
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
                      boxShadow: "4px_4px_10px_rgba(0,0,0,0.1)",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Start / Back Buttons */}
        <div className="flex flex-row-reverse gap-4 mr-12">
          <PrimaryButton
            isBig={true}
            text={"Start the Session"}
            bgColor={mentors[mentorIndex].color}
            onClick={handleStartSession}
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
