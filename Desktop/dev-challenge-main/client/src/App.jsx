import React from 'react'
import { hot } from 'react-hot-loader/root'
import AOS from 'aos'
import { Routes } from './Config/routes'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './App.css'
import 'antd/dist/antd.min.css'
import { UploadPhoto } from './Screens/Photos/Photos'
import { Task } from './Screens'

AOS.init()

const theme = createTheme({
  palette: {
    primary: {
      main: '#007aff',
      secondMain: '#1890ff'
    }
  }
})

const App = () => {

  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
      <Routes />
      {/* <News/> */}
      {/* <Sports/> */}
      {/* <Task/> */}
      {/* <UploadPhoto/> */}
      {/* </ThemeProvider> */}
    </div>
  )
}

export default hot(App)