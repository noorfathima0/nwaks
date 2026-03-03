import { Routes, Route } from "react-router-dom"

import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import ShaaleAbout from "./pages/ShaaleAbout"
import ShaaleTeam from "./pages/ShaaleTeam"
import ShaaleClasses from "./pages/ShaaleClasses"
import AboutNWAKS from "./pages/AboutNWAKS"
import BoardOfDirectors from "./pages/BoardOfDirectors"
import BoardOfExecutives from "./pages/BoardOfExecutives"
import CoreCommittee from "./pages/CoreCommittee"
import Membership from "./pages/Membership"
import Media from "./pages/Media"
import Contact from "./pages/Contact"
import CommunityAwards from "./pages/CommunityAwards"
import Rajyothsava from "./pages/Rajyothsava"
import CommunitySupport from "./pages/CommunitySupport"
import CommunityInitiatives from "./pages/CommunityInitiatives"
import UpcomingEvents from "./pages/UpcomingEvents"
import PastEvents from "./pages/PastEvents"
import Sponsors from "./pages/Sponsors"

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kannada-shaale/about" element={<ShaaleAbout />} />
        <Route path="/kannada-shaale/team" element={<ShaaleTeam />} />
        <Route path="/kannada-shaale/classes" element={<ShaaleClasses />} />
        <Route path="/about" element={<AboutNWAKS />} />
        <Route path="/board-of-directors" element={<BoardOfDirectors />} />
        <Route path="/board-of-executives" element={<BoardOfExecutives />} />
        <Route path="/core-committee" element={<CoreCommittee />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/community-awards" element={<CommunityAwards />} />
        <Route path="/rajyothsava" element={<Rajyothsava />} />
        <Route path="/community-support" element={<CommunitySupport />} />
        <Route path="/community-initiatives" element={<CommunityInitiatives />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/past-events" element={<PastEvents />} />
        <Route path="/sponsors" element={<Sponsors />} />
      </Routes>
    </MainLayout>
  )
}

export default App