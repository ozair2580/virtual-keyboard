import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CountChallenge from './challenge/CountChallenge'
import weatherApp from './challenge/weatherApp'
import Tic_Tac_Toe from './challenge/Tic-Tac-Toe'
import Chat_application from './challenge/Chat-application'
import Currency_conversion from './challenge/Currency-conversion'
import Quiz_App from './challenge/Quiz-App'
import Image_upload from './challenge/Imageuploading'
import Imagezoom from './challenge/image_scroll_zoom'
import ImageCropper from './challenge/Croping-image'
import DragAndDropCitySelector from './challenge/Drog&&drop'
import Image_Dragging from './challenge/Image-Dragging'
import PallindromeChecker from './challenge/PallindromeChecker'
import Expancess from './challenge/Expancess'

////Advance practice ///////////////////////////
import Recursive_componet from './Advance_challenges/1_recursive_componet'
import Virtual_keybord from './Advance_challenges/2_virtual_keybord'
//////////////////challenges2///////////

import Quite_generator from './Challenges2/Quite_generator'

function App() {
  return (
    <>
      <div>
        <Chat_application/>
      </div>
    </>
  )
}

export default App
