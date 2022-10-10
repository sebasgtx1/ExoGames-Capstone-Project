import { Link, useNavigate } from 'react-router-dom'
import { deleteEventRequest } from '../../api/events.api';
import stylesButton from "../styles/ButtonContainer.module.css"
import Swal from 'sweetalert2'
import { AiFillDelete } from "react-icons/ai";

export function DeleteButton(props) {
  const navigate = useNavigate();
  const confirm = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await deleteEventRequest(props.event_id);
        Swal.fire(
          'Deleted!',
          'Your event has been deleted.',
          'success'
        )
        navigate('/my_events')
      }
    })
  }
  return (

    <button className={stylesButton.dataInsideButton} onClick={confirm}> <AiFillDelete/> Delete </button>


  )
}