import React from 'react';

import Header from '../partials/Headre';
import PageIllustration from '../partials/PageIllustration';
import HeroHome from '../partials/HeroHome';
import Footer from '../partials/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />
      <main className="flex-grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        <HeroHome />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
