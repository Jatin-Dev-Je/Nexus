'use client';

import { useAppSelector } from '@/hooks/redux';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import FeedSection from '@/components/Sections/FeedSection';
import TrendingSection from '@/components/Sections/TrendingSection';
import FavoritesSection from '@/components/Sections/FavoritesSection';
import SettingsSection from '@/components/Sections/SettingsSection';
import ToastContainer from '@/components/UI/ToastContainer';

export default function HomePage() {
  const { activeSection } = useAppSelector((state) => state.ui);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'feed':
        return <FeedSection />;
      case 'trending':
        return <TrendingSection />;
      case 'favorites':
        return <FavoritesSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <FeedSection />;
    }
  };

  return (
    <>
      <DashboardLayout>
        {renderActiveSection()}
      </DashboardLayout>
      <ToastContainer />
    </>
  );
}
