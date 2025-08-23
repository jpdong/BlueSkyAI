'use client';

import GTAHomepage from '~/components/GTAHomepage';

interface GTAHomepagePageComponentProps {
  locale: string;
}

export default function GTAHomepagePageComponent({ locale }: GTAHomepagePageComponentProps) {
  return (
    <div className="gta-homepage-container">
      <GTAHomepage />
    </div>
  );
}