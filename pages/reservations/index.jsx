import { Layout, AddEdit } from 'components/users';
import { reservationService, userService, alertService } from 'services';
import { useState, useEffect } from 'react';
import { ShowTables } from 'components/users/ShowTables';

export default Tables;

function Tables() {

    return (
        <Layout>
            <h1>Find Reservation</h1>
            <ShowTables  />
        </Layout>
    );
}

// export async function getServerSideProps({ params }) {
//     return {
//         props: { id: params.id }
//     }
// }