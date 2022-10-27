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
        const resp = await PublishEventRequest(props.event_id, {public_status : status}, props.token);
        Swal.fire(
          'Publish!',
          'Your Event is ' + status +  ' now',
          'success'
        )
        navigate('/my_events', {
          state: {
              user_id: props.user_id,
              token: props.token,
              username: props.username
          }
      });
      }
    })
  }
  return (

    <button className={stylesButton.dataUserInsideButton} onClick={confirm}> {title} </button>


  )
}