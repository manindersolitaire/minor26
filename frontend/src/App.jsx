import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import PostDetails from './pages/PostDetails'
import UserPosts from './pages/UserPosts'
import axios from "axios";

axios.defaults.baseURL = "https://minor26-production.up.railway.app";
axios.defaults.withCredentials = true;


const App = () => {
  return (
    <div>
      <Header/>
      <Toaster/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/addpost' element={<AddPost/>}/>
        <Route path='/postdetails/:id' element={<PostDetails/>}/>
        <Route path='/mypost' element={<UserPosts/>}/>
      </Routes>
    </div>
  )
}

export default App
