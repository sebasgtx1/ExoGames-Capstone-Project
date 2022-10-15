import { useNavigate } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"
import Swal from 'sweetalert2'
import { PublishEventRequest } from '../../api/events.api';

export function PublishEvent(props) {
    let title = props.status == 'private' ? 'Publish' : 'Unpublish'
    let status = props.status == 'private' ? 'public' : 'private'
    

  const navigate = useNavigate();
  const confirm = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: title + " Event",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Do it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(status);
        const resp = await PublishEventRequest(props.event_id, {public_status : status});
        Swal.fire(
          'Pubish!',
          'Your Event is ' + status +  ' now',
          'success'
        )
        navigate('/my_events')
      }
    })
  }
  return (

    <button className={stylesButton.dataInsideButton} onClick={confirm}> {title} </button>


  )
}