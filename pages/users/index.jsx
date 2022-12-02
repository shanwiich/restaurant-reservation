import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { alertService, reservationService, reservationservice, userService } from 'services';
import { tableService } from 'services/table.service';

export default Index;

function Index() {
    const [reservations, setReservations] = useState(null);

    const userId = userService.userValue ? userService.userValue.id : 0;

    useEffect(() => {
        userId != 0 ? reservationService.getByUserID(userId).then(x => setReservations(x)) : setReservations([]);
    }, []);

    function unbookTables(data){
        console.log("data is: " + data)
        console.log("datatabk is: " + data.tableid)
        console.log("datatsplit is: ")
        return tableService.unbook(data.tableid)
        .then(() => {
            alertService.success(`Deleted`, { keepAfterRouteChange: true });
        })
        .catch(alertService.error);
    }

    function deleteReservation(id) {
        setReservations(reservations.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        reservationService.delete(id).then((response) => {
            console.log(response)
            unbookTables(response)
            setReservations(reservations => reservations.filter(x => x.id !== id))
        });
    }
////add/${reservationservice.userValue ? reservationservice.userValue.id : 0}
    return (
        <Layout>
            <h1>Reservations</h1>
            <Link href={`/reservations`} className="btn btn-sm btn-success mb-2">Add Reservation</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>First Name</th>
                        <th style={{ width: '30%' }}>Last Name</th>
                        <th style={{ width: '30%' }}>Seats</th>
                        <th style={{ width: '20%' }}>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {userId == 0 &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Login/Register to keep track reservations easier!</div>
                            </td>
                        </tr>
                    }
                    {reservations != "" && reservations && reservations.map((reservation) =>
                        <tr key={reservation.id}>
                            <td>{reservation.firstName}</td>
                            <td>{reservation.lastName}</td>
                            <td>{reservation.guests}</td>
                            <td>{new Date(reservation.reservationDate).getMonth()}/{new Date(reservation.reservationDate).getDate()}/{new Date(reservation.reservationDate).getFullYear()} {reservation.appt}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <button onClick={() => deleteReservation(reservation.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={reservation.isDeleting}>
                                    {reservation.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {userId != 0 && reservations == "" && !reservations.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No reservations To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout>
    );
}
