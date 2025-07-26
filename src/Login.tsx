import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate(); // lets us change pages after login
    const [email, setEmail] = useState(""); // state to hold email input
    const [password, setPassword] = useState(""); // state to hold password input

    // handles form submit
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // prevents page reload
        console.log("Email:", email); // not doing real auth, just logging for now
        console.log("Password:", password);
        navigate("/main"); // send user to main app after login
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh", width: "100vw", margin: 0, padding: 0, backgroundColor: "#f8f9fa" }}
        >
            {/* login card is centered using flex */}
            <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <h4 className="mb-3 text-center">Login to the To Do App</h4>
                <form onSubmit={handleLogin}>
                    {/* email input updates state onChange */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </div>
                    {/* password input updates state onChange */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    {/* just a basic submit button */}
                    <button type="submit" className="btn btn-warning w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
