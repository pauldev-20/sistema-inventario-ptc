# 🧪 Reto Técnico – Full Stack (AWS)

## 📊 Base de Datos

### Objetivo
Diseñar una base de datos relacional con las siguientes tablas:
- `Usuario`
- `Producto`
- `Categoría`

### Tareas
- [✅] Crear un modelo relacional cumpliendo con estándares de diseño.
- [✅] Definir campos y tipos de datos adecuados para cada tabla.
- [✅] Aplicar buenas prácticas de normalización y nombramiento.

---

## 🧩 Back End

### Tecnologías requeridas
- Node.js
- NestJS (framework)
- Prisma (ORM)

### Tareas
- [✅] Crear endpoint de inicio de sesión con JWT.
- [✅] CRUD para productos: Crear, Obtener, Editar, Eliminar.
- [✅] CRUD para categorías: Crear, Obtener, Editar, Eliminar.
- [✅] Endpoint para listar productos (con paginación).
- [✅] Proteger los endpoints de producto y categoría con validación de token JWT.
- [✅] Prevenir registros duplicados de productos por nombre.
- [✅] Validar campos (longitud, tipos de datos, etc.).
- [✅] Implementar control de errores.

---

## 🖥️ Front End

### Tecnologías requeridas
- React.js
- Next.js

### Tareas
- [✅] Crear formulario para CRUD de categoría.
- [✅] Crear formulario para CRUD de producto.
- [✅] Crear tabla/grid para listar productos (con paginación).
- [✅] Validar campos en los formularios.
- [✅] Consumir las APIs creadas para producto y categoría.

---

## 🆓 Opcional
- [✅] Agregar mejoras creativas al diseño o funcionalidades.

---

## 🌟 Puntos Extra (Integración con AWS)
- [⚠️] Implementar uso de EC2.
- [⚠️] Usar S3 para almacenamiento. (Se uso una alternativa como R2 de Cloudflare)
- [ ] Usar SES para envíos de correo.
- [⚠️] Usar RDS como base de datos. (Se uso una alternativa como NeonConsole)

## 🚀 Posibles mejores
- Añadir un refresh token.
- Personalizar los errores por defecto como el 404 y el 401 