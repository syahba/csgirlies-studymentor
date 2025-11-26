import { useSelector } from 'react-redux';

export function AgentVideo() {
  // Get selected mentor information from Redux
  const mentorId = useSelector((state) => state.setup.mentorId) || "f2c0e241-070e-4b21-900e-b563bae60ee7";

  // Map mentor IDs to their image paths
  const mentorImages = {
    "f2c0e241-070e-4b21-900e-b563bae60ee7": "/tough_love.png",     // Coach Rex
    "91b625ec-9096-4302-af35-6afe412722ab": "/supportive_teacher.png", // Miss Hana
    "9d03a911-1a85-45cc-88b0-e0554cb4c7db": "/chaotic_bestie.png"     // Tia
  };

  const imagePath = mentorImages[mentorId] || "/tough_love.png";

  return (
    <div className="bg-[var(--neutral)] w-[26rem] h-[26rem] rounded-full flex items-center justify-center overflow-hidden shadow-[4px_4px_16px_rgba(0,0,0,0.1)]">
      <img
        src={imagePath}
        alt="Study Mentor"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
}
