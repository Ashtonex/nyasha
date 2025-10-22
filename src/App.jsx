/* =========================
src/App.jsx
========================= */
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminBookings from "./pages/AdminBookings";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'

export default function App(){
const appStyle = { fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', color: '#333' }
return (
<div style={appStyle}>
<Navbar />
<main style={{ paddingTop: 70 }}>
<Routes>
<Route path='/' element={<Home/>} />
<Route path='/about' element={<About/>} />
<Route path='/services' element={<Services/>} />
<Route path='/contact' element={<Contact/>} />
<Route path="/admin" element={<AdminBookings />} />
</Routes>
</main>
<Footer />
</div>
)
}
