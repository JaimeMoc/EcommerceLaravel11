# Sistema Ecommerce Básico en Laravel

Proyecto académico de un **sistema de comercio electrónico básico**, desarrollado con **Laravel 11**, **Inertia.js** y **React + TypeScript**, aplicando buenas prácticas de desarrollo web, control de versiones y pruebas.

Este proyecto forma parte de una práctica escolar cuyo objetivo es consolidar conocimientos en frameworks modernos, arquitectura MVC, autenticación, autorización y pruebas automatizadas.

---

## 🎯 Objetivo del Proyecto

- Aplicar el uso de **Laravel** en un proyecto real.
- Implementar un sistema Ecommerce básico con:
  - Gestión de productos y categorías
  - Autenticación y roles
  - Carrito de compras
  - Checkout simulado
- Usar buenas prácticas:
  - Migrations y Eloquent ORM
  - Middleware de autorización
  - Control de versiones con GitHub
  - Pruebas automatizadas con PHPUnit

---

## ✅ Funcionalidades

### 🔐 Autenticación y Usuarios
- Registro e inicio de sesión.
- Roles de usuario:
  - **Admin**: gestión completa del sistema.
  - **Cliente**: navegación y compras.
- Protección de rutas mediante middleware.

### 📦 Gestión de Productos (Admin)
- CRUD completo de productos.
- Asignación de categorías.
- Subida de imágenes.
- Relación Producto – Categoría.

### 🗂️ Categorías (Admin)
- Creación y listado de categorías.
- Uso en productos.

### 🛒 Carrito de Compras
- Basado en sesión.
- Agregar y quitar productos.
- Cálculo de subtotal y total.
- Accesible desde el dashboard.

### ✅ Checkout (Simulado)
- Proceso de compra básico.
- Mensaje de confirmación.
- Limpieza del carrito.

---

## 🛠️ Tecnologías Utilizadas

- **Laravel 11**
- **PHP 8.2+**
- **MySQL**
- **Inertia.js**
- **React**
- **TypeScript**
- **Vite**
- **PHPUnit**
- **GitHub**

---

## 📋 Requisitos del Sistema

Antes de instalar el proyecto, asegúrate de tener:

- PHP **>= 8.2**
- Composer
- Node.js y npm
- MySQL o PostgreSQL
- Git

---

## 🚀 Instalación

Sigue estos pasos para ejecutar el proyecto en local:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
  
