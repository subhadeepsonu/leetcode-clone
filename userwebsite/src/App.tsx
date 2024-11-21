import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CodeEditor from './pages/Editor'
import Question from './pages/questions'
import QuestionById from './pages/question_by_id'
import Profile from './pages/profile'
import Login from './pages/login'
import Register from './pages/register'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CodeEditor />} />
          <Route path='/questions' element={<Question />} />
          <Route path='/questions/:id' element={<QuestionById />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter >
    </QueryClientProvider>
  )
}

export default App
