import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "yup-phone-lite";
import valid from 'card-validator';

import { Link, Spinner } from 'components';
import { reservationService, userService, alertService } from 'services';
import { useState, useEffect } from 'react';
import { tableService } from 'services/table.service';
import { feeService } from 'services/fee.service';

export { AddEdit };

function AddEdit(props) {
    const router = useRouter()

    const {
        query: {guests, date},
    } = router

    const [tables, setTables] = useState(null);

    useEffect(() => {
        // fetch user and set default form values if in edit mode
        tableService.getTablesByFilter(date, guests)
            .then(x => setTables(x))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(tables)
    const fee = feeService.checkDate(date)

    const user = props?.user;
    const guessUser = !user;

    //console.log(fee)
    // form validation rules 
    const validationSchema = Yup.object().shape({
        fees: Yup.boolean().default(fee),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        phone: Yup.string()
            .phone("US", "Please enter a valid phone number")
            .required("A input is required"),
        email: Yup.string()
            .email('Not a proper email')
            .required("A input is required"),
        tableid: Yup.string()
            .required("A reservation option is required"),
        guests: Yup.number()
            .default(parseInt(guests)),
        appt: Yup.string()
            .required('time required'),
        creditCard: Yup.string()
            .when("fees", {
                is: true,
                then: Yup.string().min(16, "you need 16 digits!").required("Must enter credit card number"),
                otherwise: Yup.string().notRequired()
            })
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
     // set default form values if in edit mode

    if (!guessUser) {
        formOptions.defaultValues = props.user;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    console.log(formState)

    function onSubmit(data) {
        bookTable(data);
        data.tableid = data.tableid.split(',');
        data.userId = user ? user.id : 0;
        data.reservationDate = tables[0].date;

        console.log(data)

        return createReservation(data)
    }

    function bookTable(data){
        return tableService.book(data.tableid.split(','))
        .then(() => {
            alertService.success(`Booked!`, { keepAfterRouteChange: true });
        })
        .catch(alertService.error);
    }

    function createReservation(data) {
        return reservationService.add(data)
            .then((reservationInfo) => {
                alertService.success(`Reservation added! Reservation Code is: ${reservationInfo.reservationID} `, { keepAfterRouteChange: true });
                router.push('/users');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {!tables ? <div>no reservations avaliable for specified filters</div> : tables.map(table =>
                    <div className="form-check">
                        <input id={table.TableId} name="tableid" type="radio" {...register('tableid')} className={`form-check-input ${errors.tableid ? 'is-invalid' : ''}`} value={`${table.TableId}`} />
                        <label className="form-check-label" htmlFor={table.TableId}> seats: {table.seats?.join(' + ')}  Date: {date}
                        </label>
                    </div>
                )}
                <div className="invalid-feedback">{errors.tableid?.message}</div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label htmlFor="appt">Select a time:</label>
                    <input type="time" {...register('appt')} id="appt" name="appt" className="form-control"/>
                    <div className="invalid-feedback">{errors.time?.message}</div>
                </div>
                <div className="form-group col">
                    <label>First Name</label>
                    <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Last Name</label>
                    <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Phone #</label>
                    <input name="phone" type="number" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Email</label>
                    <input name="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            {fee ?             
            <div className="form-row">
                <div className="form-group col">
                    <label>Credit Card Number *High Track day selected. There is a $10 cancellation fee. Please Enter Credit Card Number*</label>
                    <input name="creditCard" type="number" {...register('creditCard')} className={`form-control ${errors.creditCard ? 'is-invalid' : ''}`} />
                    {/* <div className="invalid-feedback">{errors.creditCard?.message}</div> */}
                    <div className="invalid-feedback">{errors.creditCard?.message}</div>
                </div>
            </div> 
            : <div></div>}
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/reservations" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}