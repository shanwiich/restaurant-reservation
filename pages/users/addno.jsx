import { Layout, AddEdit } from 'components/users';
import { userService, alertService } from 'services';
import { useState, useEffect } from 'react';

export default Add;

function Add() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // fetch user and set default form values if in edit mode
        userService.getById(id)
            .then(x => setUser(x))
            .catch(alertService.error)


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <h1>Add Reservation</h1>
            {user ? <AddEdit user={user} /> : <AddEdit  />}
        </Layout>
    );
}