import "../../styles/header.css";


export default function Header() {
    return (
        <header>
            <h1>WorkPulse</h1>
            <h2>Employee Payroll System</h2>
            <div className="button-container">
                <button onClick={() => window.location.href = "/login"}>Login</button>
                <button onClick={() => window.location.href = "/register"}>Register</button>
            </div>
        </header>
    );
}
