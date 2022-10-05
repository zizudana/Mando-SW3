import React, { useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import Popup from './components/popup';
import axios from 'axios';

function Calendar() {
  const [event_data, set_event_data] = useState([]);
  const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});

  useEffect(()=>{
    async function readEvent() {
      //const url = "http://localhost:1323/events/all";
      const url = "https://shrouded-headland-42492.herokuapp.com/events/all"
      const response = await axios.get(url);
      set_event_data(response.data.event_arr);
      console.log("성공");
      console.log(response.data);
    }
    readEvent();
  },[]);

  const closePopup = () => {
    setPopup({
      open: false
    });
  }

  return (
    <>
    <Popup open = {popup.open} close={closePopup} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
    <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin]}
    editable
    selectable
    eventClick={handleEventClick}
    events={event_data}
    customButtons={{myCustomButton: {text: '차량예약하기',
    click: function() {
      setPopup({
        open: true,
        title: "차량 예약하기",
        message: "차종과 사용자명을 입력해주세요."
      });
      return;
    }
  }}
}
    headerToolbar={{left: 'prev,next today',
    center: 'title',
    right: 'myCustomButton prev,next'}}
  />
  </>
  )
}

function handleEventClick(info) { // bind with an arrow function
  alert(info.event.title + '\n' + info.event.display);
  // change the border color just for fun
  info.el.style.backgroundColor = 'red';
}

export default Calendar;