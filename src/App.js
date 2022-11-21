import React, { useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import Popup from './components/popup';
import Eopup from './components/epopup';
import axios from 'axios';
import './index.css';

function Calendar() {
  const [event_data, set_event_data] = useState([]);
  const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
  const [epopup, setePopup] = useState({open: false, title: "", message: "", callback: false});
  const [date, setDate] = useState("");
  const [event_id, setId] = useState("")
  useEffect(()=>{
    async function readEvent() {
      //const url = "http://localhost:1323/events/all";
      //const url = "https://shrouded-headland-42492.herokuapp.com/events/all"
      const url = "https://mando-zizudana.koyeb.app/events/all"
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

  const closeePopup = () => {
    setePopup({
      open: false
    });
  }

  return (
    <body>
    <Popup date = {date} open = {popup.open} close={closePopup} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
    <Eopup id = {event_id} open = {epopup.open} close={closeePopup} message = {epopup.message} title = {epopup.title}/>
    <p className='notice'>*탑승자는 동승자 포함 함께 이동하는 인원 전체 입력해주세요*</p>
    <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin]}
    editable
    selectable
    displayEventTime={false}
    contentHeight={600}
    eventClick={function(info){
      setId(info.event.id);
      setePopup({
        open: true,
        title: `${info.event.title}`,
        message: `${info.event.display}`
      });
      return;
    }}
    dateClick={function(info){
      setDate(info.date);
      setPopup({
        open: true,
        title: "차량 예약하기",
        message: "차종과 사용자명을 입력해주세요."
      });
      return;
    }}
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
  eventDeleteButton: {text: '예약취소', click: function() {
    alert("관리자에게 문의해주세요");
  }}}
}
    headerToolbar={{left: '',
    center: 'prev title next',
    right: ''}}
  />
  <footer>Contact : daeun.kim <br/> zizudana32@gmail.com</footer>
  </body>
  )
}
/*
function handleEventClick(info) { // bind with an arrow function
  //alert(info.event.title + '\n' + info.event.display);
  // change the border color just for fun
  //info.el.style.backgroundColor = 'green';
  //axios.delete(`https://shrouded-headland-42492.herokuapp.com/events/${info.event.id}`)
  //const param = {id:info.event.id};
  if (window.confirm(`${info.event.title}\n${info.event.display}\n예약을 취소하시나요?`))
  {
    axios
    //.delete(`http://localhost:1323/events/${info.event.id}`)
    .delete(`https://shrouded-headland-42492.herokuapp.com/events/${info.event.id}`)
    .then(res => {window.location.href = "/"});
  }
}
*/
export default Calendar;