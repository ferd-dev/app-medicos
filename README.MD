# Proyecto SIS324

## Sistema web para la promoción de medicos

## Estructura de respuesta de la API

```json
{
  "success": true,
  "message": "Mensaje de respuesta",
  "data": {
    "id_usuario": 1,
    "id_medico": 1
  },
  "token": "Token de acceso"
}
```

## Estructura de respuesta de la API en caso de error

```json
{
  "success": false,
  "message": "Mensaje de error"
}
```

## Estructura para guardar en el local storage

```json
{
  "token": "Token de acceso",
  "id_usuario": 1,
  "id_medico": 1
}
```
