export  default function Login() {
    return (
        <div className="login">
            <div className="login-form">

                <h1>Login</h1>


                <label htmlFor="eid">Employee Id</label>
                <input
                    type="number"
                    name="eid"
                    placeholder="username"
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                />

                <button
                    type="submit"
                >
                    Login
                </button>

            </div>
        </div>
    )
}