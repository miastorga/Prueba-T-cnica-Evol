## **Problemática**

En Evol Services se necesita crear una interfaz gráfica que permita listar, crear, actualizar y eliminar datos de medidores y de nuestros clientes. Un cliente puede tener de 1 hasta 3 medidores asignados.

Considere necesario ingresar los siguientes campos o atributos para cada medidor:

**_Campos Requeridos:_**

- código: texto alfanumérico único
- nombre: texto
- fecha de creación: fecha

**_Campos Opcionales:_**

- descripción: texto con descripción del medidor

Para los datos de clientes se debe ingresar:

**_Campos Requeridos_**

- RUT: texto con formato RUT
- nombre: texto
- dirección : texto

Considere distribuir la arquitectura de este requerimento según estime conveniente.
Para almacenar los datos utilice una base de datos Postgres.
Para la interfaz es importante usar React.
Si decide crear una API de servicios puede utilizar Nodejs o Java con Springboot.
Deberá incluir la documentación necesaria para configuración/ejecución o scripts de la solución.
Puede utilizar las librerías que estime necesarias para el desarrollo de la solución.

## **Documentación de Ejecución de la Configuración del Proyecto**

### **Introducción**

Este documento proporciona instrucciones detalladas sobre cómo configurar y ejecutar la base de datos PostgreSQL usando Docker y conectarla a nuestra aplicación.

### **Requisitos Previos**

- Tener instalado Docker.
- Tener instalado Node.js.
- Acceso a la línea de comandos o terminal.

### **Instrucciones**

1. **Iniciar el Contenedor PostgreSQL en Docker**:

   Asegúrate de tener una imagen de PostgreSQL descargada. Si no la tienes, primero descárgala:

   ```bash
   docker pull postgres
   ```

   Luego, inicia un contenedor con esa imagen:

   ```bash
   docker run --name postgres-evol -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
   ```

   Esto iniciará un contenedor llamado `postgres-evol` con la contraseña configurada como 'mysecretpassword'. El puerto 5432 de tu máquina se mapeará al puerto 5432 del contenedor.

2. **Conectar la Aplicación a la Base de Datos**:

   Dentro de tu proyecto, tienes un archivo que utiliza el paquete `pg` para conectarse a PostgreSQL. La configuración es:

   ```javascript
   const { Pool } = require("pg");

   const pool = new Pool({
     user: "postgres",
     password: "mysecretpassword",
     host: "localhost",
     port: 5432,
     database: "evol",
   });
   ```

   Asegúrate de que la configuración coincide con los detalles del contenedor PostgreSQL que acabas de iniciar.

### **Solución de Problemas**

- **Error de conexión**: Asegúrate de que el contenedor Docker esté en ejecución (`docker ps` para verificar) y que los detalles de conexión en tu archivo coincidan con los del contenedor.
- **Error de dependencias**: Asegúrate de tener todas las dependencias necesarias instaladas con `npm install`.

---

### **Introducción**

Aplicación de gestión que permite a los usuarios agregar y gestionar información sobre clientes y medidores. La interfaz proporciona un formulario para la entrada de datos y una tabla para visualizar, editar y eliminar los registros existentes.

### **Funcionalidades**

#### **Clientes**:

1. **Agregar Cliente**:

   - **RUT**: Campo para introducir el número de identificación del cliente.
   - **Nombre**: Campo para el nombre completo del cliente.
   - **Dirección**: Dirección de residencia o negocio del cliente.
   - Botón **Guardar**: Una vez llenado el formulario, haga clic en este botón para guardar la información del cliente.

2. **Tabla de Clientes**:
   - Visualiza todos los clientes registrados.
   - **Editar**: Permite modificar la información del cliente seleccionado.
   - **Eliminar**: Elimina el cliente seleccionado de la base de datos.

#### **Medidores**:

1. **Agregar Medidor**:

   - **Código**: Identificador único para el medidor.
   - **Nombre**: Descripción o modelo del medidor.
   - **Fecha de Creación**: Fecha en que se añadió el medidor.
   - **RUT**: Debe asociar el medidor a un cliente existente ingresando su RUT.
   - Botón **Guardar**: Guarda la información del medidor después de completar el formulario.

2. **Tabla de Medidores**:
   - Muestra todos los medidores registrados.
   - **Editar**: Modifica la información del medidor seleccionado.
   - **Eliminar**: Elimina el medidor seleccionado de la base de datos.

### **Tecnologías Utilizadas**:

#### **Frontend**:

- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **@mui/material**: Librería de diseño de Material-UI para React.
- **@emotion/react y @emotion/styled**: Bibliotecas de estilos CSS-in-JS.
- **react-router-dom**: Biblioteca para gestionar rutas y navegación en la aplicación React.

#### **Backend**:

- **Express**: Marco de aplicación web para Node.js.
- **cors**: Middleware de Express para habilitar CORS.
- **morgan**: Middleware de registro de solicitudes HTTP para Node.js.
- **pg**: Cliente de Node.js para PostgreSQL.

### **Iniciar la Aplicación**:

1. **Frontend**: Navegue al directorio del frontend y ejecute `npm run dev` para iniciar el servidor de desarrollo React.
2. **Backend**: Navegue al directorio del backend y ejecute `npm run dev` para iniciar el servidor Express.

---

## Rutas y Métodos de Clientes

### 1. Crear cliente

- **Ruta**: `/`
- **Método**: `POST`
- **Descripción**: Crea un nuevo cliente.
- **Body**:

  ```json
  {
    "rut": "12345678-9",
    "nombre": "Juan Pérez",
    "direccion": "Calle Principal 123"
  }
  ```

- **Respuesta esperada**:

  ```json
  {
    "statusCode": 201,
    "modelName": "cliente",
    "message": "Cliente creado con éxito"
  }
  ```

- **Errores**:
  - `400`: El cliente con ese RUT ya existe.
  - `500`: Error al crear cliente.

### 2. Eliminar cliente

- **Ruta**: `/:rut`
- **Método**: `DELETE`
- **Descripción**: Elimina un cliente por RUT.

- **Respuesta esperada**:

  ```json
  {
    "modelName": "cliente",
    "message": "Cliente eliminado con éxito"
  }
  ```

- **Errores**:
  - `404`: Cliente no encontrado.
  - `409`: No se puede eliminar el cliente ya que está asociado con un medidor.
  - `500`: Error al eliminar cliente.

### 3. Obtener todos los clientes

- **Ruta**: `/`
- **Método**: `GET`
- **Descripción**: Devuelve todos los clientes registrados.
- **Respuesta esperada**:
  ```json
  {
    "data": [
      /* Array con todos los clientes */
    ],
    "modelName": "clientes"
  }
  ```
- **Errores**:
  - `500`: Algo salió mal al obtener todos los clientes.

### 4. Obtener un cliente específico

- **Ruta**: `/:rut`
- **Método**: `GET`
- **Descripción**: Devuelve un cliente específico por RUT.

- **Respuesta esperada**:

  ```json
  {
    "data": {
      /* Datos del cliente específico */
    },
    "modelName": "cliente"
  }
  ```

- **Errores**:
  - `404`: Cliente no encontrado.
  - `500`: Algo salió mal al obtener el cliente.

### 5. Actualizar cliente

- **Ruta**: `/:rut`
- **Método**: `PUT`
- **Descripción**: Actualiza un cliente existente por RUT. Puedes actualizar el RUT, nombre y dirección.

- **Body**:

  ```json
  {
    "rut": "NuevoRut",
    "nombre": "Nuevo Nombre",
    "direccion": "Nueva Dirección"
  }
  ```

- **Respuesta esperada**:

  ```json
  {
    "cliente": {
      /* Datos del cliente actualizado */
    },
    "modelName": "cliente",
    "message": "Cliente actualizado con éxito"
  }
  ```

- **Errores**:
  - `404`: Cliente no encontrado.
  - `409`: El RUT proporcionado ya existe.
  - `500`: Error al actualizar cliente.

---

## Rutas y Métodos de Medidores

### **1. Crear Medidor**

**Descripción:** Añade un nuevo medidor a la base de datos.

- **Método:** POST
- **Ruta:** `/api/medidores`
- **Body:**
  - `rut`: RUT del cliente al que se asignará el medidor.
  - `nombre`: Nombre del medidor.
  - `codigo`: Código único del medidor.
  - `fechaCreacion`: Fecha de creación del medidor.

### **2. Eliminar Medidor**

**Descripción:** Elimina un medidor existente en la base de datos a través de su código.

- **Método:** DELETE
- **Ruta:** `/api/medidores/:codigo`
- **Parámetros URL:**
  - `codigo`: Código único del medidor.

### **3. Obtener Todos los Medidores**

**Descripción:** Obtiene una lista de todos los medidores en la base de datos.

- **Método:** GET
- **Ruta:** `/api/medidores`

### **4. Obtener Medidor por Código**

**Descripción:** Obtiene detalles de un medidor específico utilizando su código.

- **Método:** GET
- **Ruta:** `/api/medidores/:codigo`
- **Parámetros URL:**
  - `codigo`: Código único del medidor.

### **5. Actualizar Medidor**

**Descripción:** Actualiza la información de un medidor existente.

- **Método:** PUT
- **Ruta:** `/api/medidores/:codigo`
- **Parámetros URL:**
  - `codigo`: Código antiguo del medidor (en caso de que el código se vaya a cambiar).
- **Body:**
  - `codigo`: Nuevo código del medidor (opcional).
  - `nombre`: Nuevo nombre del medidor.
  - `fechaCreacion`: Nueva fecha de creación del medidor.
  - `rut`: RUT del cliente asociado.

---

- No se puede crear un medidor con un código que ya exista.
- Un cliente no puede tener más de tres medidores asociados.
- No se puede actualizar un medidor a un código que ya esté en uso.
