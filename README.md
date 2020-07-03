#Version en produccion
Para ver la api en funcionamiento ir al siguiente link
(http://34.70.104.102:3001)
# Proyecto para aplicar a plaza de Backend dev

Este proyecto consiste en una API RestFull para el almacenamiento de mensajes en memoria y la posibilidad de exponer este recurso(mensajes) a otras aplicaciones cliente.

---
## Mas detalles de la aplicacion
La API posee segmentos de rutas las cuales requieren de autenticacion para poder acceder a los recursos expuestos por estas rutas.
El metodo de autenticacion esta basado EN HMAC un mecanismo para la autenticacion atravez de mensajes y funciones hash criptograficas.

Para acceder a las rutas que requieren autenticacion es necesario especificar 3 headers extras los cuales detallamos a continuacion.

* X-Key: Header con la llave previamente registrada en el servidor atraves de una URL para almacenar credenciales.
* X-Route: Header que describe la ruta que se desea utilzar. Este Header debera de concincidir con la Uri del request para que la autenticacion se valida.

* X-Signature: Header con un string Hexadecinal que representa el hash que el servidor generara con el secreto indicado por la llave.

Para mayor informacion de cual es el algoritmo para la encriptacion ver el siguiente enlace (https://docs.google.com/document/d/e/2PACX-1vQ4SrDtusTMLvj1vf0R83rSrtQJZgrsVhvqNHrgxWWoPwAryQktCE12DyzX8jeAuUDdIZkhoo_QvfZ1/pub?urp=gmail_link) 



## Requerimientos

Para entornos de desarrollo solo se necesitara de Nodejs instalado en tu equipo, asi como tambien los siguientes paquetes:

* nodemon
* crypto-js
* Express 

### Node
- #### Instalacion de Node en Windows

  Ir a la pagina oficial de Node [official Node.js website](https://nodejs.org/) y descargar el instalador.

  Tener en cuenta en configurar tus variables de entorno para acceder a `npm`

- #### Instalacion de Node en sistemas Unix/Linux

    Tienes la opcion de instalar linux atraves del gestor de paquetes nativo.
    Por ejemplo en Ubuntu solo bastara de los siguientes comandos:
      $ sudo apt install nodejs
      $ sudo apt install npm




## Instalacion y descarga de dependencias

    $ git clone https://github.com/byronjl2003/masterDevBack
    $ cd NOMBRE_PROYECTO
    $ npm install


## Para correr el proyecto

    $ npm start



