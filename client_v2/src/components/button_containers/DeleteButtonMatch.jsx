import { useNavigate } from 'react-router-dom'
import { deleteMatchRequest } from '../../api/matches.api';
import Swal from 'sweetalert2'
import { AiFillDelete } from "react-icons/ai";
export function DeleteMatchButton(props) {

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
                const resp = await deleteMatchRequest(props.match_id);
                Swal.fire(
                    'Deleted!',
                    'match deleted.',
                    'success'
                ).then(() => {
                    window.location.reload();
                })
            }
        })
    }
    return (

        <AiFillDelete onClick={confirm} />


    )
}