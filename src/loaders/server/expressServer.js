const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const config = require("../../config");
const logger = require("../logger");

class ExpressServer {
  constructor() {
    //* Se declaran al instanciar un objeto de esta clase
    this.app = express();
    this.port = config.port;
    this.basePathWeather = `${config.api.prefix}/weather`;
    this.basePathCities = `${config.api.prefix}/cities`;

    //* Invoco cada vez que se cree una instancia
    this._middlewares(); // Se aplican los middlewares
    this._routes(); // Se especifican como se manejan las rutas

    //* Realizo el llamado
    this._swaggerConfig();

    //* Si la request no entra por ningun endpoint, por defecto van a ser manejadas por el endpoint de 'not found'
    //! Es muy importante tener en cuenta el ORDEN, ya que el endpoint a continuacion actua como un 'comodin'
    this._notFound();

    //* Si llega una request con algun error sera manejado por este ultimo endpoint.
    this._errorHandler();
  }

  //* Aquellas funciones que comienzan con '_' son funciones "PRIVADAS"
  _middlewares() {
    this.app.use(express.json());
    this.app.use(morgan("tiny")); //? Imprime infomacion sobre las requests al servidor
  }

  _routes() {
    //? Ruta creada para verificar la estabilidad(caida o no) de la aplicacion
    this.app.head("/status", (req, res) => {
      res.status(200).end();
    });

    //* Indico que todas las direcciones de 'api/v1/...'(basePathUser) se manejen con las rutas del archivo indicado
    this.app.use(this.basePathWeather, require("../../routes/weather"));
    this.app.use(this.basePathCities, require("../../routes/cities"));
  }

  _notFound() {
    this.app.use((req, res, next) => {
      const error = new Error("Not Found");
      error.status = 404;
      error.code = 404;
      next(error);
    });
  }

  _errorHandler() {
    this.app.use((err, req, res, next) => {
      const code = err.code || 500;
      logger.error(
        `${code} - ${err.message} - ${req.originalUrl} - ${req.method}`
      );

      const body = {
        error: {
          code,
          message: err.message,
        },
      };
      res.status(code).json(body);
    });
  }

  //? Configuracion de SWAGGER (para documentacion de la API)
  _swaggerConfig() {
    this.app.use(
      config.swagger.path,
      swaggerUi.serve,
      swaggerUi.setup(require("../swagger/swagger.json"))
    );
  }

  //? Funcion para levantar el servidor
  async start() {
    this.app.listen(this.port, error => {
      if (error) {
        logger.error("Error:", error);
        process.exit(1);
        return;
      }
    });
  }
}

module.exports = ExpressServer;
