import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AdminPrivate() {
  const admin = localStorage.getItem('adminIsAuth')
  console.log('is logged in - ', admin)
  return admin ? <Outlet /> : <Navigate to={'/admin/signin?private=true'} />
}

export default AdminPrivate