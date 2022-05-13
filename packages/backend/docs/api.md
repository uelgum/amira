# API
Informationen über die Amira API.

<!-- TODO Socket API hinzugefügen -->
> Dieser Abschnitt befasst sich ausschließlich mit der REST API von Amira. Siehe die Dokumentation für [Socket API](#).

## Schema
Die Amira API hält sich im Bezug auf Anfragen und Antworten an feste Schemas. Das Format soll über alle Endpunkte verteilt stets einheitlich bleiben.

### Anfrage
Alle `POST`-Anfragen müssen ein JSON-Objekt mitliefern mit den jeweilig angeforderten Daten.

Geschützte Routen benötigen im [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)-Header ein von Amira ausgestelltes JWT mit Schema `Bearer`.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiI...
```

### Antwort
<!-- tabs:start -->
#### **Erfolg**
```json
{
    "status": "ok",
    "success": true,
    "data": {}
}
```

#### **Fehler**
```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "ERROR_CODE",
        "subcode": "ERROR_SUBCODE"
    }
}
```
<!-- tabs:end -->

## Endpunkte
Die Endpunkte sind nach Zugehörigkeit gruppiert. Unbekannte Endpunkte und mit anderen Methoden existrierende Endpunkte werden mit `NOT_FOUND` beantwortet. Folgende Endpunkte können verwendet werden:

### Authentifizierung
Die Endpunkte dieser Gruppe werden zur Authentifizierung und zum Erstellen neuer Benutzerkonten verwendet.

### `POST` Login
```
/api/auth/login
```

Dieser Endpunkt meldet einen Nutzer an und schickt ein JWT zurück.

<!-- tabs:start -->
#### **Anfrage**
**Body-Parameter**

| Name       | Typ      | Beschreibung               | Optional |
|------------|----------|----------------------------|----------|
| `email`    | `string` | E-Mail des Benutzerkontos. | ❌       |
| `password` | `string` | Passwort.                  | ❌       |

#### **Antwort**
**200 OK**
<br/>
Der Nutzer hat sich erfolgreich angemeldet.

```json
{
    "status": "ok",
    "success": true,
    "data": {
        "token": "Bearer eyJhbGciOiJIUzI1NiI..."
    }
}
```

Ist das Benutezrkonto mit einer unbestätigten E-Mail verbunden, so wird in `data` neben dem Token der Boolean `emailUnverified` mitgeliefert.

**400 Bad Request**
<br/>
Der Nutzer hat fehlende oder fehlerhafte Daten angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "AUTH_ERROR",
        "subcode": "INVALID_DATA"
    }
}
```

| Subcode              | Beschreibung                                            |
|----------------------|---------------------------------------------------------|
| `INVALID_DATA`       | Fehlende oder fehlerhafte Daten wurden angegeben.       |
| `INVALID_LOGIN_DATA` | Fehlende oder fehlerhafte Login-Daten wurden angegeben. |
<!-- tabs:end -->

### `POST` Registrierung
```
/api/auth/register
```

Dieser Endpunkt erstellt ein neues Benutzerkonto.

<!-- tabs:start -->
#### **Anfrage**
**Body-Parameter**

| Name             | Typ      | Beschreibung               | Optional |
|------------------|----------|----------------------------|----------|
| `firstName`      | `string` | Vorname.                   | ❌       |
| `lastName`       | `string` | Nachname.                  | ❌       |
| `email`          | `string` | E-Mail.                    | ❌       |
| `password`       | `string` | Passwort.                  | ❌       |
| `passwordRetype` | `string` | Bestätigung des Passworts. | ❌       |

#### **Antwort**
**200 OK**
<br/>
Das Benutzerkonto wurde erfolgreich erstellt.

```json
{
    "status": "ok",
    "success": true
}
```

**400 Bad Request**
<br/>
Folgendes ist möglich:
- Der Nutzer hat fehlende oder fehlerhafte Daten angegeben.
- Ein Benutzerkonto mit derselben E-Mail existiert bereits.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "AUTH_ERROR",
        "subcode": "INVALID_DATA"
    }
}
```

| Subcode                | Beschreibung                                      |
|------------------------|---------------------------------------------------|
| `INVALID_DATA`         | Fehlende oder fehlerhafte Daten wurden angegeben. |
| `EMAIL_ALREADY_EXISTS` | Die E-Mail wird bereits verwendet.                |
<!-- tabs:end -->