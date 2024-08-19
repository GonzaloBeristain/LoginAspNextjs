"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [imagen, setImagen] = useState('');
    const [error, setError] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repassword){
            setErrorPassword("Las contraseñas no coinciden.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("apellido", apellido);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("repassword", repassword);
            formData.append("imagen", imagen);

            const res = await fetch("https://localhost:7149/api/Usuarios", {
                method: "POST",
                body: formData
                });

            if (!res.ok) {
                const errorData = await res.text();
                setError(errorData);
            } else {
                const data = await res.json();
                router.push("/login");
            }
        } catch (error) {
            setError("Error en la solicitud:", error.message);
            console.log(error)
        }
    } 
    
    return (
        <div>
            <section>
                <form className="flex flex-col bg-slate-900 px-24 py-14 rounded-3xl border border-slate-500 shadow hover:bg-slate-950 transition-colors duration-300"
                onSubmit={handleSubmit}>
                    <h1 className="text-white text-5xl font-bold text-center pb-4">Registrarse</h1>

                    {
                        nombre == "" ? 
                        (<label className="text-white text-xl font-semibold pb-2" name="nombre">Nombre <span className="text-red-600">*</span></label>) 
                        : 
                        (<label className="text-white text-xl font-semibold pb-2" name="nombre">Nombre</label>)
                    }
                    <input className="text-lg rounded p-1" type="text" name="nombre" placeholder="Ingrese su nombre" required
                    value={nombre} onChange={(e) => setNombre(e.target.value)} />

                    {
                        apellido == "" ?
                        (<label className="text-white text-xl font-semibold py-2" name="apellido">Apellido <span className="text-red-600">*</span></label>)
                        :
                        (<label className="text-white text-xl font-semibold py-2" name="apellido">Apellido</label>)
                    }
                    <input className="text-lg rounded p-1" type="text" name="apellido" placeholder="Ingrese su apellido" required
                    value={apellido} onChange={(e) => setApellido(e.target.value)} />

                    {
                        email == "" ?
                        (<label className="text-white text-xl font-semibold py-2" name="email">Email <span className="text-red-600">*</span></label>)
                        :
                        (<label className="text-white text-xl font-semibold py-2" name="email">Email</label>)
                    }
                    {error && <p className="text-red-600 pb-2">{error}</p>}
                    <input className="text-lg rounded p-1" type="email" name="email" placeholder="Ingrese su email" required
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                    {
                        password == "" ?
                        (<label className="text-white text-xl font-semibold py-2" name="password">Contraseña<span className="text-red-600">*</span></label>)
                        :
                        (<label className="text-white text-xl font-semibold py-2" name="password">Contraseña</label>)
                    }
                    <input className="text-lg rounded p-1" type="password" name="password" placeholder="Ingrese su contraseña" required
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                    {
                        repassword == "" ?
                        (<label className="text-white text-xl font-semibold py-2" name="repassword">Repita su Contraseña<span className="text-red-600">*</span></label>)
                        :
                        (<label className="text-white text-xl font-semibold py-2" name="repassword">Repita su Contraseña</label>)
                    }
                    <input className="text-lg rounded p-1" type="password" name="repassword" placeholder="Repita su contraseña" required
                    value={repassword} onChange={(e) => setRepassword(e.target.value)} />

                    <label className="text-white text-xl font-semibold py-2" name="imagen">Imagen</label>
                    <input className="text-lg rounded p-1" type="text" name="imagen" placeholder="Ingrese URL"
                    value={imagen} onChange={(e) => setImagen(e.target.value)} />
                    
                    <div className="pt-5 flex flex-col justify-center items-center gap-y-2">
                        <button className="text-white font-medium text-xl bg-green-800 w-28 py-2 rounded shadow transition-colors duration-300 hover:bg-green-900" type="submit">Registrar</button>
                        <Link className="text-white font-medium transition-colors duration-300 hover:text-slate-300" href="/">Volver</Link>
                    </div>
                    <div className="pt-2">
                    {
                        (!nombre || !apellido || !email || !password || !repassword) ? 
                        (<p className="text-red-600">* Datos obligatorios.</p>)
                        :
                        (errorPassword) ?
                        (<p className="text-red-600">* Las contraseñas no coinciden.</p>)
                        :
                        null
                    }
                    </div>
                </form>
            </section>
        </div>
    )
};