import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './modal.css';

function Eopup({id, open, close, setPopup, message, title, callback}) {
  const cancelEvent = () => { // bind with an arrow function
    //alert(info.event.title + '\n' + info.event.display);
    // change the border color just for fun
    //info.el.style.backgroundColor = 'green';
    //axios.delete(`https://shrouded-headland-42492.herokuapp.com/events/${info.event.id}`)
    //const param = {id:info.event.id};
    if (window.confirm("예약을 취소하시나요?"))
    {
      axios
      //.delete(`http://localhost:1323/events/${id}`)
      //.delete(`https://shrouded-headland-42492.herokuapp.com/events/${id}`)
      .delete(`https://mando-zizudana.koyeb.app/events/${id}`)
      .then(res => {window.location.href = "/"});
    }
  }
    return (

      <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
          <Modal.Title>{title}</Modal.Title>
          </header>
          <main>
            <p>{message}</p>
            </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
            <button className="cancel" onClick={cancelEvent}>
              예약취소
            </button>
          </footer>
        </section>
      ) : null}
    </div>
      
    );
}




export default Eopup;