import { Router, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "yup-phone-lite";

import { Link } from 'components';
import { reservationService, userService, alertService } from 'services';
import { tableService } from 'services/table.service';
import Add from 'pages/reservations/add/reserve';
import { AddEdit } from './AddEdit';
import { Layout } from 'components/account';

export { ShowTables };

function ShowTables(props) {
    const router = useRouter();
    
    const validationSchema = Yup.object().shape({
        guests: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .required('Specify number of Guests!')
            .min(1, 'You must have atleast one Guest!'),
        date: Yup.string()
            .required('date is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return showReservations(data)
    }

    function showReservations(data){
        router.push({
            pathname: "/reservations/add/reserve",
            query: data
        })
        //router.push(`/reservations/add/reserve`)
        // return tableService.getByFilter(data)
        //     .then((reservationInfo) => {
        //         alertService.success(`Reservation added! Reservation Code is: ${reservationInfo.reservationID} `, { keepAfterRouteChange: true });
        //         router.push('/users');
        //     })
        //     .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label># Of Guests</label>
                    <input name="guests" type="number"  min="1" max="10" {...register('guests')} className={`form-control ${errors.guests ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Date</label>
                    <input name="date" type="date" {...register('date')} className={`form-control ${errors.date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Find
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/users" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}