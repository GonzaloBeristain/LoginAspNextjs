﻿using backendAPI.Models;
using backendAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.CodeAnalysis.Scripting;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtService _jwtService;
    private readonly DbloginContext _context;

    public AuthController(JwtService jwtService, DbloginContext context)
    {
        _jwtService = jwtService;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromForm] string usuario, [FromForm] string password)
    {
        // Buscar al usuario por email
        var user = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Email == usuario);

        // Verificar si el usuario existe y si la contraseña es correcta
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            return Unauthorized(new { message = "Correo electrónico o contraseña incorrectos." });
        }

        // Generar el token JWT
        var token = _jwtService.GenerateToken(user.Email);

        return Ok(new { Token = token, id = user.Id });
    }
}