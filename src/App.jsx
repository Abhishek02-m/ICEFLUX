import { useState } from 'react';
import LoginScreen from './components/LoginScreen.jsx';
import TopBar from './components/TopBar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MissionPlanner from './pages/MissionPlanner.jsx';
import IceForecast from './pages/IceForecast.jsx';
import IcebergWatch from './pages/IcebergWatch.jsx';
import RouteAnalysis from './pages/RouteAnalysis.jsx';
import LiveMission from './pages/LiveMission.jsx';
import Fleet from './pages/Fleet.jsx';
import Insights from './pages/Insights.jsx';
import Settings from './pages/Settings.jsx';

const PAGES = {
  dashboard: Dashboard,
  planner: MissionPlanner,
  forecast: IceForecast,
  iceberg: IcebergWatch,
  analysis: RouteAnalysis,
  live: LiveMission,
  fleet: Fleet,
  insights: Insights,
  settings: Settings,
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!loggedIn) {
    return <LoginScreen onEnter={() => setLoggedIn(true)} />;
  }

  const ActivePage = PAGES[activeTab] ?? Dashboard;

  function handleNavigate(tab) {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return (
    <div id="app-shell" className="active">
      <TopBar activeTab={activeTab} onSelectTab={handleNavigate} />
      <main className="content">
        <ActivePage onNavigate={handleNavigate} />
      </main>
    </div>
  );
}
