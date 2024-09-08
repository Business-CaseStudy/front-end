import React from 'react'
import SidebarComp from '../../components/Navbar/SidebarComp'

export default function Home() {
  return (
    <div style={{ display: 'flex' }}>  {/* Utiliser flex pour aligner les éléments horizontalement */}
    <SidebarComp />
    <div style={{ flex: 1, padding: '20px' }}>
      <h1>Welcome to My Application</h1>
      <p>Here is the main content of the page.</p>
    </div>
  </div>
  )
}
