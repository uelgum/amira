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

> Die Eigenschaft `data` wird nicht von allen Endpunkten zurückgeschickt.

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
Die Endpunkte sind nach Zugehörigkeit gruppiert. Unbekannte Endpunkte und mit anderen Methoden existrierende Endpunkte werden mit `NOT_FOUND` beantwortet. Folgende Endpunkte der Amira API können verwendet werden:

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
        "code": "INVALID_DATA"
    }
}
```

Folgende Subcodes sind möglich:

| Subcode              | Beschreibung                                            |
|----------------------|---------------------------------------------------------|
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
        "code": "INVALID_DATA"
    }
}
```

Folgende Subcodes sind möglich:

| Subcode                | Beschreibung                                      |
|------------------------|---------------------------------------------------|
| `EMAIL_ALREADY_EXISTS` | Die E-Mail wird bereits verwendet.                |
<!-- tabs:end -->


### Konto
Die Endpunkte dieser Grupper werden zum Verwalten und Abrufen von Kontodaten verwendet.

> Alle Endpunkte dieser Gruppe benötigen Authentifizierung.

### `GET` Kontakte
```
/api/account/contacts
```

Dieser Endpunkt ruft alle Kontakte des Kontos ab.

<!-- tabs:start -->
#### **Anfrage**
**Header**

| Name             | Typ      | Beschreibung      | Optional |
|------------------|----------|-------------------|----------|
| `Authentication` | `string` | Erhaltenes Token. | ❌       |

#### **Antwort**
**200 OK**
<br/>
Alle Kontakte wurden erfolgreich abgerufen.

```json
{
    "status": "ok",
    "success": true,
    "data": {
        "contacts": [
            {
                "id": "",
                "name": ""
            }
        ]
    }
}
```

Der Array `contacts` besteht aus Objekten, die jeweils einen bestätigten Kontakt darstellen. Jeder Kontakt enthält:
- `id` - ID des Kontaktes.
- `name` - Voller Name des Kontaktes.

**401 Unauthorized**
<br/>
Es wurde kein gültiges Token angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "UNAUTHORIZED"
    }
}
```
<!-- tabs:end -->

### `GET` Benachrichtigungen
```
/api/account/notifications
```

Dieser Endpunkt ruft alle Benachrichtigungen des Kontos ab.

<!-- tabs:start -->
#### **Anfrage**
**Header**

| Name             | Typ      | Beschreibung      | Optional |
|------------------|----------|-------------------|----------|
| `Authentication` | `string` | Erhaltenes Token. | ❌       |

#### **Antwort**
**200 OK**
<br/>
Alle Benachrichtigungen wurden erfolgreich abgerufen.

```json
{
    "status": "ok",
    "success": true,
    "data": {
        "notifications": [
            {
                "id": "",
                "type": "",
                "data": {},
                "createdAt": 0
            }
        ]
    }
}
```

Der Array `notifications` besteht aus Objekten, die jeweils eine Benachrichtigung darstellen. Jede Benachrichtigung enthält:
- `id` - ID der Benachrichtigung.
- `type` - Typ der Benachrichtigung.
- `data` - Zusätliche Informationen.
- `createdAt` - Zeitpunkt der Erstellung.

**401 Unauthorized**
<br/>
Es wurde kein gültiges Token angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "UNAUTHORIZED"
    }
}
```
<!-- tabs:end -->

### `GET` Bestätigung der E-Mail
```
/api/account/verify-email
```

Dieser Endpunkt bestätigt die E-Mail.

<!-- tabs:start -->
#### **Anfrage**
**Header**

| Name             | Typ      | Beschreibung      | Optional |
|------------------|----------|-------------------|----------|
| `Authentication` | `string` | Erhaltenes Token. | ❌       |

**Body-Parameter**

| Name   | Typ      | Beschreibung                                      | Optional |
|--------|----------|---------------------------------------------------|----------|
| `hash` | `string` | Einzigartiger Verifizierungs-Hash aus der E-Mail. | ❌       |

#### **Antwort**
**200 OK**
<br/>
Die E-Mail wurde erfolgreich bestätigt.

```json
{
    "status": "ok",
    "success": true
}
```

**400 Bad Request**
<br/>
Der Nutzer hat fehlende oder fehlerhafte Daten angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "INVALID_DATA"
    }
}
```

**401 Unauthorized**
<br/>
Es wurde kein gültiges Token angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "UNAUTHORIZED"
    }
}
```
<!-- tabs:end -->

### Kontakte
Die Endpunkte dieser Grupper werden zum Verwalten von Kontakten verwendet.

> Alle Endpunkte dieser Gruppe benötigen Authentifizierung.

### `POST` Kontakt-Anfrage

```
/api/contact/request
```

Dieser Endpunkt verschickt eine Kontakt-Anfrage an einen anderen Nutzer.

<!-- tabs:start -->
#### **Anfrage**
**Header**

| Name             | Typ      | Beschreibung      | Optional |
|------------------|----------|-------------------|----------|
| `Authentication` | `string` | Erhaltenes Token. | ❌       |

**Body-Parameter**

| Name          | Typ      | Beschreibung       | Optional |
|---------------|----------|--------------------|----------|
| `recipientId` | `string` | ID des Empfängers. | ❌       |

#### **Antwort**
**200 OK**
<br/>
Die Kontakt-Anfrage wurde erfolgreich versandt.

```json
{
    "status": "ok",
    "success": true
}
```

**400 Bad Request**
<br/>
Der Nutzer hat fehlende oder fehlerhafte Daten angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "INVALID_DATA"
    }
}
```

Folgende Subcodes sind möglich:

| Subcode                  | Beschreibung                     |
|--------------------------|----------------------------------|
| `CONTACT_ALREADY_EXISTS` | Der Kontakt besteht bereits.     |
| `INVALID_RECIPIENT_ID`   | Die Empfänger-ID ist fehlerhaft. |

**401 Unauthorized**
<br/>
Es wurde kein gültiges Token angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "UNAUTHORIZED"
    }
}
```
<!-- tabs:end -->

### `POST` Kontakt-Anfrage zurückziehen
```
/api/contact/widthdraw
```

Dieser Endpunkt zieht eine versendete Kontakt-Anfrage zurück.

<!-- tabs:start -->
#### **Anfrage**
**Header**

| Name             | Typ      | Beschreibung      | Optional |
|------------------|----------|-------------------|----------|
| `Authentication` | `string` | Erhaltenes Token. | ❌       |

**Body-Parameter**

| Name          | Typ      | Beschreibung       | Optional |
|---------------|----------|--------------------|----------|
| `recipientId` | `string` | ID des Empfängers. | ❌       |

#### **Antwort**
**200 OK**
<br/>
Die Kontakt-Anfrage wurde erfolgreich zurückgezogen.

```json
{
    "status": "ok",
    "success": true
}
```

**400 Bad Request**
<br/>
Der Nutzer hat fehlende oder fehlerhafte Daten angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "INVALID_DATA"
    }
}
```

Folgende Subcodes sind möglich:

| Subcode             | Beschreibung                      |
|---------------------|-----------------------------------|
| `CONTACT_NOT_FOUND` | Der Kontakt wurde nicht gefunden. |

**401 Unauthorized**
<br/>
Es wurde kein gültiges Token angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "UNAUTHORIZED"
    }
}
```
<!-- tabs:end -->

### `POST` Kontakt-Anfrage annehmen
```
/api/contact/accept
```

Dieser Endpunkt nimmt eine erhaltene Kontakt-Anfrage an.

<!-- tabs:start -->
#### **Anfrage**
**Header**

| Name             | Typ      | Beschreibung      | Optional |
|------------------|----------|-------------------|----------|
| `Authentication` | `string` | Erhaltenes Token. | ❌       |

**Body-Parameter**

| Name       | Typ      | Beschreibung    | Optional |
|------------|----------|-----------------|----------|
| `senderId` | `string` | ID des Senders. | ❌       |

#### **Antwort**
**200 OK**
<br/>
Die Kontakt-Anfrage wurde erfolgreich angenommen.

```json
{
    "status": "ok",
    "success": true
}
```

**400 Bad Request**
<br/>
Der Nutzer hat fehlende oder fehlerhafte Daten angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "INVALID_DATA"
    }
}
```

Folgende Subcodes sind möglich:

| Subcode             | Beschreibung                      |
|---------------------|-----------------------------------|
| `CONTACT_NOT_FOUND` | Der Kontakt wurde nicht gefunden. |

**401 Unauthorized**
<br/>
Es wurde kein gültiges Token angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "UNAUTHORIZED"
    }
}
```
<!-- tabs:end -->

### `POST` Kontakt-Anfrage ablehnen
```
/api/contact/decline
```

Dieser Endpunkt lehnt eine erhaltene Kontakt-Anfrage ab.

<!-- tabs:start -->
#### **Anfrage**
**Header**

| Name             | Typ      | Beschreibung      | Optional |
|------------------|----------|-------------------|----------|
| `Authentication` | `string` | Erhaltenes Token. | ❌       |

**Body-Parameter**

| Name       | Typ      | Beschreibung    | Optional |
|------------|----------|-----------------|----------|
| `senderId` | `string` | ID des Senders. | ❌       |

#### **Antwort**
**200 OK**
<br/>
Die Kontakt-Anfrage wurde erfolgreich abgelehnt.

```json
{
    "status": "ok",
    "success": true
}
```

**400 Bad Request**
<br/>
Der Nutzer hat fehlende oder fehlerhafte Daten angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "INVALID_DATA"
    }
}
```

Folgende Subcodes sind möglich:

| Subcode             | Beschreibung                      |
|---------------------|-----------------------------------|
| `CONTACT_NOT_FOUND` | Der Kontakt wurde nicht gefunden. |

**401 Unauthorized**
<br/>
Es wurde kein gültiges Token angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "UNAUTHORIZED"
    }
}
```
<!-- tabs:end -->

### `POST` Kontakt entfernen
```
/api/contact/delete
```

Dieser Endpunkt entfernt einen bestehenden Kontakt.

<!-- tabs:start -->
#### **Anfrage**
**Header**

| Name             | Typ      | Beschreibung      | Optional |
|------------------|----------|-------------------|----------|
| `Authentication` | `string` | Erhaltenes Token. | ❌       |

**Body-Parameter**

| Name          | Typ      | Beschreibung            | Optional |
|---------------|----------|-------------------------|----------|
| `contactId`   | `string` | ID des anderen Nutzers. | ❌       |

#### **Antwort**
**200 OK**
<br/>
Die Kontakt wurde erfolgreich entfernt.

```json
{
    "status": "ok",
    "success": true
}
```

**400 Bad Request**
<br/>
Der Nutzer hat fehlende oder fehlerhafte Daten angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "INVALID_DATA"
    }
}
```

Folgende Subcodes sind möglich:

| Subcode             | Beschreibung                      |
|---------------------|-----------------------------------|
| `CONTACT_NOT_FOUND` | Der Kontakt wurde nicht gefunden. |

**401 Unauthorized**
<br/>
Es wurde kein gültiges Token angegeben.

```json
{
    "status": "err",
    "success": false,
    "err": {
        "code": "UNAUTHORIZED"
    }
}
```
<!-- tabs:end -->

### ...