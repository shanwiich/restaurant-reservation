import { Layout, AddEdit } from 'components/users';
import { reservationService, userService, alertService } from 'services';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { tableService } from 'services/table.service';

export default Add;

function Add() {
    const id = userService.userValue ? userService.userValue.id : 0
    const [user, setUser] = useState(null);
    const [tables, setTables] = useState(null);
    const router = useRouter()

    const {
        query: {guests, date},
    } = router

    if(id != 0){
        useEffect(() => {
            // fetch user and set default form values if in edit mode
            userService.getById(id)
                .then(x => setUser(x))
                .catch(alertService.error)

                
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    }

    console.log({user} +  '  here')

    return (
        <Layout>
            <h1>Add Reservation</h1>
            {user ? <AddEdit user={user} /> : <AddEdit  />}
        </Layout>
    );
}

// export async function getServerSideProps({ params }) {
//     return {
//         props: { id: params.id }
//     }
// }