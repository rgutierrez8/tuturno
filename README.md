# **Tu Turno**

*Aplicación web destinada a visualizar y solicitar turnos disponibles para canchas de futsal (fútbol 5). Las canchas, comentarios y los usuarios se encuentran en una base de datos*

## Instalaciones necesarias

**Una vez clonado el repositorio, es necesario instalar las dependencias para el correcto uso de la aplicación**

`npm install`

## Endpoints

### USUARIOS

`/user/logIn`
Realiza la verificación, si un usuario existe y la contraseña ingresada coincide con la guardada en la Base de Datos. De ser afirmativo puede ingresar a las diferentes secciones de la aplicación, en caso contrario se le aplican restricciones de acceso.

`/user/profile`
Permite el acceso al perfil del usuario logeado. Próximamente modificar su información y/o cargar una foto de perfil.

`/user/logout`
Destruye la sesión actual y redirige al Home.

`/user/signUp`
Formulario de registro para nuevos usuarios. Comprueba que el usuario y/o email aún no existan en la Base de Datos.

### TURNOS

`/turn/searchTurn`
Despliega una lista de las canchas con turnos disponibles. En esta sección, se encuentran opciones para filtrar canchas por nombre u hora disponible.

`/turn/selectTurn`
Ingresa a la cancha seleccionada para poder alquilarla en la hora que se elija. DEBE ESTAR LOGEADO PARA INGRESAR A ESTA SECCIÓN.

### CANCHAS

`/stadium/stadiumRegister`
Permite a dueños de canchas asociarse a Tu Turno completando un formulario para una posterior revisión.


## Diagrama de funcionamiento

![Diagrama Proyecto Tu Turno (1)](https://user-images.githubusercontent.com/81074439/122856506-47494b80-d2ed-11eb-8175-776c479e614f.png)


## Mejoras para nuevas versiones

 - [] Incluir métodos de pago.
 - [] Mejorar la verificación de login y signup
 - [] Mostrar turno alquilado e historial de turnos alquilados en perfil de usuario.
 - [] Inlcuir página de administrador.

## :computer:Construido con

    - HTML5
    - CSS3
    - JavaScript
    - Node JS
    - Express
    - Mongo DB

## :man_technologist:Autor

    - Ramón Gutierrez 
        - Linkedin: https://www.linkedin.com/in/rgutierrez8/
        - GitHub: https://github.com/rgutierrez8
