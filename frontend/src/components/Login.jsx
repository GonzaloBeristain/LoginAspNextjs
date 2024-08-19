"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('usuario', email);
        formData.append('password', password);

        try {
            const response = await fetch('https://localhost:7149/api/auth/login', {
                method: 'POST',
                body: formData
                });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
            } else {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);
                router.push('/login/perfil');
            }
        } catch (error) {
            setError('Error en la solicitud');
        }
    }

    return (
        <div>
            <section>
                <form className="flex flex-col bg-slate-900 p-24 rounded-3xl border border-slate-500 shadow hover:bg-slate-950 transition-colors duration-300"
                onSubmit={handleSubmit}>
                    <h1 className="text-white text-5xl font-bold text-center pb-4">Iniciar sesión</h1>
                    <label className="text-white text-xl font-semibold pb-2" name="email">Email</label>
                    <input className="text-lg rounded p-1" type="text" name="email" placeholder="Ingrese su email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="text-white text-xl font-semibold py-2" name="password">Contraseña</label>
                    <input className="text-lg rounded p-1" type="password" name="password" placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="pt-5 flex flex-col justify-center items-center gap-y-2">
                        <button className="text-white font-medium text-xl bg-green-800 w-28 py-2 rounded shadow transition-colors duration-300 hover:bg-green-900" type="submit">Ingresar</button>
                        <Link className="text-white font-medium transition-colors duration-300 hover:text-slate-300" href="/">Volver</Link>
                    </div>
                    {error && <p className="text-red-600 pt-2">{error}</p>}
                </form>
            </section>
        </div>
    )
};