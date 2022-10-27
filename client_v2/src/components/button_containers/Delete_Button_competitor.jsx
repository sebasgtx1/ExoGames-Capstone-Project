import { useNavigate } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"
import Swal from 'sweetalert2'
import { deleteCompetitorRequest } from '../../api/competitors.api';
import { AiFillDelete } from "react-icons/ai";

export function DeleteButtonCompetitor(props) {
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
        const resp = await deleteCompetitorRequest(props.competitor_id, props.token);
        Swal.fire(
          'Deleted!',
          'Your Competitor has been deleted.',
          'success'
        )
        navigate('/my_competitors', {
          state: {
              user_id: props.user_id,
              token: props.token,
              username: props.username
          }
      })
      }
    })
  }
  return (

    <button className={stylesButton.dataInsideButton} onClick={confirm}> <AiFillDelete/>Delete </button>


  )
}