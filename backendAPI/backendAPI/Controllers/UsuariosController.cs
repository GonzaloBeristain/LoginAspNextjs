using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backendAPI.Models;
using System.Collections;
using Microsoft.AspNetCore.Authorization;
using Microsoft.CodeAnalysis.Scripting;

namespace backendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly DbloginContext _context;

        public UsuariosController(DbloginContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // GET: api/Usuarios/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PUT: api/Usuarios/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id,
            [FromForm] string nombre,
            [FromForm] string apellido,
            [FromForm] string email,
            [FromForm] string password,
            [FromForm] string? imagen)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID.");
            }

            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            // Si el usuario se encuentra, actualizamos sus propiedades
            usuario.Nombre = nombre;
            usuario.Apellido = apellido;
            usuario.Email = email;

            // Solo actualizamos la contraseña si se proporciona una nueva
            if (!string.IsNullOrEmpty(password))
            {
                usuario.Password = BCrypt.Net.BCrypt.HashPassword(password);
            }

            usuario.Imagen = imagen;

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Usuarios
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(
                [FromForm] string nombre,
                [FromForm] string apellido,
                [FromForm] string email,
                [FromForm] string password,
                [FromForm] string? imagen)
        {
            // Verificar si el correo electrónico ya está en uso
            var existingUser = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
            if (existingUser != null)
            {
                return Conflict("El correo electrónico ya está en uso.");
            }

            //Hash del password
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            var nuevoUsuario = new Usuario
            {
                Nombre = nombre,
                Apellido = apellido,
                Email = email,
                Password = hashedPassword,
                Imagen = imagen
            };

            _context.Usuarios.Add(nuevoUsuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = nuevoUsuario.Id }, nuevoUsuario);
        }

        // DELETE: api/Usuarios/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }
    }
}