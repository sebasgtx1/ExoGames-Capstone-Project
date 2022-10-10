import { Link, useNavigate } from 'react-router-dom';
import stylesButton from "../styles/ButtonContainer.module.css"
import Swal from 'sweetalert2'
import { deleteVenueRequest } from '../../api/venues.api';
import { AiFillDelete } from "react-icons/ai";

export function DeleteButtonVenue(props) {
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
        const resp = await deleteVenueRequest(props.venue_id);
        Swal.fire(
          'Deleted!',
          'Your venue has been deleted.',
          'success'
        )
        navigate('/my_venues')
      }
    })
  }
  return (

    <button className={stylesButton.dataInsideButton} onClick={confirm}> <AiFillDelete/>Delete </button>


  )
}