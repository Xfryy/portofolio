import AnimatedBackground from '@/components/AnimatedBackground';
import Hero from '@/components/hero';
import FeaturedProject from '@/components/FeaturedProject';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <AnimatedBackground />
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <Hero 
            title="Building bridges between design and code"
            subtitle="I'm a web developer with a passion for creating visually stunning and highly functional websites."
            showButtons={true}
            showProfile={true}
          />

          {/* Featured Project */}
          <FeaturedProject 
            title="Next.js"
            description="A modern, server-rendered React framework for building full-stack web applications"
            projectUrl="/work/nextjs"
            role="Fullstack developer"
            technologies={['Next.js', 'React', 'TypeScript']}
          />
        </div>
      </div>
    </PageTransition>
  );
}