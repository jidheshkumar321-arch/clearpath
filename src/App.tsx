import React from 'react';
import { useApp } from './context/AppContext';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { SignInView } from './components/auth/SignInView';
import { SignUpView } from './components/auth/SignUpView';
import { PasswordRecoveryView } from './components/auth/PasswordRecoveryView';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { CaseList } from './components/cases/CaseList';
import { CaseWorkspace } from './components/cases/CaseWorkspace';
import { CreateCaseWizard } from './components/cases/CreateCaseWizard';
import { RemindersManager } from './components/reminders/RemindersManager';
import { DocumentManager } from './components/documents/DocumentManager';
import { GuideDirectory } from './components/guides/GuideDirectory';
import { BusinessWorkspace } from './components/business/BusinessWorkspace';
import { SettingsView } from './components/settings/SettingsView';

export const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const isPublicView =
    currentView === 'landing' ||
    currentView === 'sign-in' ||
    currentView === 'sign-up' ||
    currentView === 'recovery';

  const renderMainContent = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'sign-in':
        return <SignInView />;
      case 'sign-up':
        return <SignUpView />;
      case 'recovery':
        return <PasswordRecoveryView />;
      case 'dashboard':
        return <DashboardOverview />;
      case 'cases':
        return <CaseList />;
      case 'case-workspace':
        return <CaseWorkspace />;
      case 'create-case':
        return <CreateCaseWizard />;
      case 'reminders':
        return <RemindersManager />;
      case 'documents':
        return <DocumentManager />;
      case 'guides':
        return <GuideDirectory />;
      case 'business':
        return <BusinessWorkspace />;
      case 'settings':
        return <SettingsView />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090B10] text-[#F8FAFC] font-sans selection:bg-violet-600/30 selection:text-violet-200">
      {/* Platform Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Top Header */}
      <Navbar />

      {/* Workspace or Public Body */}
      {isPublicView ? (
        <main className="flex-1 bg-[#090B10]">{renderMainContent()}</main>
      ) : (
        <div className="flex-1 flex max-w-7xl mx-auto w-full bg-[#090B10]">
          {/* Desktop Left Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main App Canvas */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-w-0 bg-[#090B10]">
            {renderMainContent()}
          </main>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
