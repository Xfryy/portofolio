import React from 'react';
import Image from 'next/image';

const GitHubActivity = () => {
  return (
    <div className="w-full p-6 rounded-xl backdrop-blur-sm"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
    >
      <h3 className="text-2xl font-bold mb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        GitHub Activity
      </h3>
      <div className="flex flex-col items-center gap-4">
        {/* GitHub Calendar */}
        <div className="w-full overflow-x-auto">
          <Image
            src="https://ghchart.rshah.org/your-github-username"
            alt="GitHub Contribution Graph"
            width={1000}
            height={200}
            className="w-full"
            style={{ maxWidth: '100%', height: 'auto' }}
            unoptimized={true}
          />
        </div>
        
        {/* GitHub Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Image
            src="https://github-readme-stats.vercel.app/api?username=your-github-username&show_icons=true&theme=transparent&hide_border=true&title_color=blue&text_color=inherit"
            alt="GitHub Stats"
            width={500}
            height={200}
            className="w-full rounded-lg"
            unoptimized={true}
          />
          <Image
            src="https://github-readme-streak-stats.herokuapp.com/?user=your-github-username&theme=transparent&hide_border=true&stroke=blue&ring=blue&fire=blue&currStreakNum=inherit&sideNums=inherit&dates=inherit&sideLabels=inherit&currStreakLabel=inherit"
            alt="GitHub Streak"
            width={500}
            height={200}
            className="w-full rounded-lg"
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  );
};

export default GitHubActivity;