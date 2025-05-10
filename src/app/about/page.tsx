import AnimatedBackground from '@/components/AnimatedBackground';
import ProfileSection from '@/components/ProfileSection';
import BioSection from '@/components/BioSection';
import SkillsSection from '@/components/SkillSection'; // Ensure this import is correct

export default function About() {
  return (
    <>
      <AnimatedBackground />
      
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Section */}
          <ProfileSection 
            name="M. Faatih"
            role="Web Developer"
            location="Asia/Jakarta"
            imageUrl="/Components/Profile.jpg"
          />
          
          {/* Bio Section */}
          <BioSection 
            bio="My Name is Muhammad Faatih I lived in Bekasi-based design engineer with a passion for transforming complex challenges into simple, elegant design solutions. My work spans digital interfaces, interactive experiences, and the convergence of design and technology."
          />
          
          {/* Skills Section */}
          <SkillsSection />
        </div>
      </div>
    </>
  );
}