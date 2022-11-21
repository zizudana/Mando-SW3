import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from 'axios';
import './modal.css';

function Popup({date, open, close, setPopup, message, title, callback}) {
  const [car_name, set_car_name] = useState("K7");
  const [users, set_users] = useState("");
  const [time, set_time] = useState("하루종일");
  const [dest, set_dest] = useState("");
  const [all_ok, set_all_ok] = useState(false);
  const mydate = new Date(date)

  const is_ok = (e) => {
    e.preventDefault()
    if (users.length === 0){
      alert("사용자명을 입력해주세요");
      return false
    }
    else if(window.confirm(`차종: ${car_name}\n사용일: ${mydate.toLocaleDateString()}\n탑승자: ${users}\n목적지: ${dest}\n사용시간: ${time}\n예약하시나요?`)){
      const event_data = {
        id : `${mydate.getTime()}${car_name}`,
        title: car_name,
        display: `탑승자: ${users}\n목적지: ${dest}\n사용시간: ${time}`,
        //start: new Date(start),
        start: mydate
      };
      axios
        //.post("https://shrouded-headland-42492.herokuapp.com/events/add",event_data)
        //.post("http://localhost:1323/events/add",event_data)
        .post("https://mando-zizudana.koyeb.app/events/add",event_data)
        .then(response => {
          console.log("response",response.data)
          window.location.href = "/"
        });
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
                <option value="TRAX">TRAX</option>
            </select>
              <input
                type="string"
                placeholder="탑승자 입력"
                onChange={(e)=>{set_users(e.target.value)}}
                name='users'
              />
              <input
                type="string"
                placeholder="목적지 입력"
                onChange={(e)=>{set_dest(e.target.value)}}
                name='dest'
              />
              <input
                type="string"
                placeholder="사용시간 입력(선택사항)"
                onChange={(e)=>{set_time(e.target.value)}}
                name='time'
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