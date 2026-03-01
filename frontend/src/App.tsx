import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './styles/globals.css'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import Consultas from './pages/Consultas'
import NewConsulta from './pages/NewConsulta'
import Diagnosis from './pages/Diagnosis'
import TreatmentPlan from './pages/TreatmentPlan'
import Budget from './pages/Budget'
import Sessions from './pages/Sessions'
import Payments from './pages/Payments'
import Calendar from './pages/Calendar'

// Layouts
import MainLayout from './layouts/MainLayout'

const queryClient = new QueryClient()

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token')
  
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientDetail />} />
            <Route path="consultas" element={<Consultas />} />
            <Route path="consultas/new" element={<NewConsulta />} />
            <Route path="diagnostico/:id" element={<Diagnosis />} />
            <Route path="plan/:id" element={<TreatmentPlan />} />
            <Route path="presupuesto/:id" element={<Budget />} />
            <Route path="sesiones" element={<Sessions />} />
            <Route path="payments" element={<Payments />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
