"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const Perfil = () => {
    const [usuario, setUsuario] = useState("");
    const [id, setId] = useState("");
    const router = useRouter();

    const handleClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        
        router.push("/")
    };

    const getData = async (token, id) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            myHeaders.append('Content-Type', 'application/json');

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            const response = await fetch(`https://localhost:7149/api/Usuarios/${id}`, requestOptions);
            const data = await response.json();
            setUsuario(data);
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storageId = localStorage.getItem("id");

        if(token && storageId) {
            setId(storageId);
            getData(token, storageId);
        } else {
            router.push("/login")
        }
    }, []);

    return (
        <div>
            <div className="pb-2 text-center">
                <h1 className="text-white">Bienvenid@, <span className="font-bold text-lg">{usuario.nombre}!</span></h1>
            </div>
            <div className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]">
                <div className="absolute flex flex-col items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
                    <section className="p-4">
                        <img className="rounded-full shadow bg-slate-300" src={`${usuario.imagen}${usuario.nombre}`} alt="Img" />
                    </section>
                    <section className="flex flex-col justify-center items-center pb-2">
                        <p className="text-lg text-slate-100 font-semibold">{usuario.nombre} {usuario.apellido}</p>
                        <p className="text-base text-slate-100 font-semibold">{usuario.email}</p>
                    </section>
                </div>
                <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
            </div>
            <div className="flex items-center justify-center pt-4"> 
                <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" onClick={handleClick}
                >
                    Logout
                </button>
            </div>
        </div>
    )
};