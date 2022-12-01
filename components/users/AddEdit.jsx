import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "yup-phone-lite";

import { Link } from 'components';
import { reservationService, userService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const user = props?.user;
    const isAddMode = !user;
    const router = useRouter();
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstNameRes: Yup.string()
            .required('First Name is required'),
        lastNameRes: Yup.string()
            .required('Last Name is required'),
        phone: Yup.string()
            .phone("US", "Please enter a valid phone number")
            .required("A input is required"),
        email: Yup.string()
            .email('Not a proper email')
            .required("A input is required"),
        guests: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .required('Specify number of Guests!')
            .min(1, 'You must have atleast one Guest!')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        formOptions.defaultValues = props.user;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    // function onSubmit(data) {
    //     return isAddMode
    //         ? createUser(data)
    //         : updateUser(user.id, data);
    // }

    // function createUser(data) {
    //     return userService.register(data)
    //         .then(() => {
    //             alertService.success('User added', { keepAfterRouteChange: true });
    //             router.push('.');
    //         })
    //         .catch(alertService.error);
    // }
    // function onSubmit(data) {
    //     return isAddMode
    //         ? createReservation(user.id, data)
    //         : updateUser(user.id, data);
    // }

    function onSubmit(data) {
        return createReservation(user.id, data)
    }

    function createReservation(id, data) {
        return reservationService.add(id, data)
            .then(() => {
                alertService.success('Reservation added', { keepAfterRouteChange: true });
                router.push('/users');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('User updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>First Name</label>
                    <input name="firstNameRes" type="text" {...register('firstNameRes')} className={`form-control ${errors.firstNameRes ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstNameRes?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Last Name</label>
                    <input name="lastNameRes" type="text" {...register('lastNameRes')} className={`form-control ${errors.lastNameRes ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastNameRes?.message}</div>
                </div>
            </div>
            <div className="form-row">
                {/* <div className="form-group col">
                    <label>Username</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div> */}
                {/* <div className="form-group col">
                    <label>
                        Password
                        {!isAddMode && <em className="ml-1">(Leave blank to keep the same password)</em>}
                    </label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div> */}
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
                <div className="form-group col">
                    <label># Of Guests</label>
                    <input name="guests" type="number"  min="1" max="10" {...register('guests')} className={`form-control ${errors.guests ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/users" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}