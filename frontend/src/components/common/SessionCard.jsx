import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { downloadSessionSummary } from "../../redux/slices/studySessionsSlice";

function SessionCard({ session }) {
  const dispatch = useDispatch();
  const { downloading } = useSelector((state) => state.studySessions);
  const [downloadStatus, setDownloadStatus] = useState(null);

  const handleDownload = async () => {
    try {
      setDownloadStatus("downloading");
      await dispatch(downloadSessionSummary(session.room_name));
      setDownloadStatus("success");

      // Reset success status after 3 seconds
      setTimeout(() => setDownloadStatus(null), 3000);
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadStatus("error");

      // Reset error status after 3 seconds
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  const isDownloadingThis = downloading === session.room_name;

  return (
    <div className="bg-[var(--neutral)] p-4 rounded-3xl shadow-[4px_4px_16px_rgba(0,0,0,0.1)] w-full max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[var(--black)] font-bold text-lg truncate flex-1 mr-2">
          {session.room_name.replace(/_/g, ' ').split(' ').slice(0, -1).join(' ')}
        </h3>
        <span className="text-[var(--black)] text-sm bg-[var(--lighter-secondary)] px-2 py-1 rounded-full">
          {session.date}
        </span>
      </div>

      <p className="text-[var(--black)] text-sm mb-4">
        Study session summary and key takeaways
      </p>

      <button
        onClick={handleDownload}
        disabled={isDownloadingThis}
        className={`
          w-full py-2 px-4 rounded-xl font-semibold transition-all duration-200
          flex items-center justify-center gap-2
          ${isDownloadingThis
            ? 'bg-gray-400 cursor-not-allowed'
            : downloadStatus === 'success'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : downloadStatus === 'error'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-[var(--secondary)] hover:bg-[var(--darker-secondary)] text-[var(--black)]'
          }
        `}
      >
        {isDownloadingThis ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Downloading...
          </>
        ) : downloadStatus === 'success' ? (
          <>
            <FontAwesomeIcon icon={faCheckCircle} />
            Downloaded!
          </>
        ) : downloadStatus === 'error' ? (
          <>
            <FontAwesomeIcon icon={faDownload} />
            Try Again
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faDownload} />
            Download Summary
          </>
        )}
      </button>
    </div>
  );
}

export default SessionCard;
