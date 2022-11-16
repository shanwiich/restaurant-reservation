import { userService } from 'services';
import { Link } from 'components';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1 id="name">Hi {userService.userValue ? userService.userValue.firstName : "Guest"}!</h1>
                <p>You&apos;re logged in with Next.js & JWT!!</p>
                <p><Link href="/users">Manage Reservations</Link></p>
            </div>
        </div>
    );
}
