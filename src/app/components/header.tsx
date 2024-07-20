import Link from 'next/link';
import "../../styles/header.css";

export default function Header() {
    return (
        <header>
            <h1>WorkPulse</h1>
            <h2>Employee Payroll System</h2>
            <div className="button-container">
                <Link href="/login">
                    <button>Login</button>
                </Link>
                <Link href="/register">
                    <button>Register</button>
                </Link>
            </div>
        </header>
    );
}
