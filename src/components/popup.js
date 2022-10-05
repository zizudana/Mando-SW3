import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from 'axios';
import './modal.css';

function Popup({open, close, setPopup, message, title, callback}) {
  const [car_name, set_car_name] = useState("K7");
  const [users, set_users] = useState("");
  const [start, set_start] = useState("");
  const [time, set_time] = useState("하루종일");
  const [dest, set_dest] = useState("");
  const [all_ok, set_all_ok] = useState(false);

  const is_ok = (e) => {
    e.preventDefault()
    if (users.length === 0){
      alert("사용자명을 입력해주세요");
      return false
    }
    if (start.length === 0){
      alert("사용일을 입력해주세요");
      return false
    }
    else if(window.confirm(`차종: ${car_name}\n탑승자: ${users}\n목적지: ${dest}\n사용일: ${start}\n예약하시나요?`)){
      const event_data = {
        title: car_name,
        display: `탑승자: ${users}\n목적지: ${dest}\n사용시간: ${time}`,
        start: new Date(start),
        //end: new Date(end)
      };
      axios.post("https://shrouded-headland-42492.herokuapp.com/events/add",event_data,{
        'Content-Type': 'application/json',
    }, );
    window.location.href = "/"
  }
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      if (!all_ok){
        set_all_ok(is_ok(e))
      }
  }

    return (

      <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
          <Modal.Title>{title}</Modal.Title>
          </header>
          <main>< form id='addEvent'>
              <select name="car_name" form="addEvent" onChange={(e)=>{set_car_name(e.target.value)}}>
                <option value="K7">K7</option>
                <option value="K9">트랙스</option>
            </select>
              <input
                type="string"
                placeholder="탑승자를 입력하세요"
                onChange={(e)=>{set_users(e.target.value)}}
                name='users'
              />
              <input
                type="string"
                placeholder="목적지를 입력하세요"
                onChange={(e)=>{set_dest(e.target.value)}}
                name='dest'
              />
              <input
                type="string"
                placeholder="사용시간을 입력하세요(선택사항)"
                onChange={(e)=>{set_time(e.target.value)}}
                name='time'
              />
              <input
                type="Date"
                placeholder="사용일을 선택하세요"
                onChange={(e)=>{set_start(e.target.value)}}
                name='start'
              />
              < input type='submit' onClick={(e)=>{handleSubmit(e)}}/>
            </form ></main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
      
    );
}

export default Popup;