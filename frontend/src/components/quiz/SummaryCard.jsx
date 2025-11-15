import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCrown } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../common/PrimaryButton";

function SummaryCard({ isMastered }) {
  return (
    <div className="flex flex-col items-center bg-[var(--neutral)] py-4.5 px-5.5 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col items-start mb-6">
        <p className="text-caption text-[var(--black)]">Nov 2nd, 2025</p>

        <div className="flex items-center gap-3 mb-1">
          <h5 className="text-[var(--black)]">Chemical Reaction</h5>
          {isMastered ? (
            <FontAwesomeIcon
              icon={faCrown}
              size="2xs"
              style={{
                color: "var(--lighter-accent-2)",
                backgroundColor: "var(--accent-2)",
                padding: "0.35rem 0.3rem",
                borderRadius: "1.5rem",
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCheck}
              size="xs"
              style={{
                color: "var(--lighter-accent-3)",
                backgroundColor: "var(--accent-3)",
                padding: "0.25rem 0.2rem",
                borderRadius: "1.5rem",
              }}
            />
          )}
        </div>

        <p className="text-small text-[var(--black)] border-2 border-[var(--lighter-primary)] text-center py-1 px-3 rounded-3xl">
          1st Year of Junior High School
        </p>
      </div>

      <PrimaryButton
        isBig={false}
        text={"Download Summary"}
        bgColor={"yellow"}
      ></PrimaryButton>
    </div>
  );
}

export default SummaryCard;
