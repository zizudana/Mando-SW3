import React, { useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import Popup from './components/popup';
import axios from 'axios';
import './index.css';

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
    displayEventTime={false}
    contentHeight={600}
    eventClick={handleEventClick}
    events={event_data}
    titleFormat={function(date) {
      return `${date.date.year}년 ${date.date.month + 1}월`;
    }}
    customButtons={{eventAddButton: {text: '차량예약하기',
    click: function() {
      setPopup({
        open: true,
        title: "차량 예약하기",
        message: "차종과 사용자명을 입력해주세요."
      });
      return;
    }
  }, 
  eventDeleteButton: {text: '예약취소하기', click: function() {
    alert("관리자에게 문의해주세요");
  }}}
}
    headerToolbar={{left: 'today eventDeleteButton',
    center: 'prev title next',
    right: 'eventAddButton today'}}
  />
  </>
  )
}

function handleEventClick(info) { // bind with an arrow function
  alert(info.event.title + '\n' + info.event.display);
  // change the border color just for fun
  info.el.style.backgroundColor = 'green';
}

export default Calendar;