# HmCoin

## Projektbeschreibung

HMCoin ist ein Proof-of-Concept für eine minimale Kryptowährung. Die Grundidee ist, das die Mindestanforderungen an eine Kryptowährung mit dahinterliegender Blockchain erfüllt sind. HMCoin wurde im Rahmen einer Hochschulvorlesung entwickelt und vorgestellt. Daher erfüllt HMCoin lediglich einen Bildungszweck.

## Architektur

![HMCoinArch](https://github.com/DerAlexx/HMCoin/blob/main/assets/Architektur.jpeg)

### Frontend 

Das Frontend stellt die Möglichkeit dar sich als Benutzer an der Blockchain zu beteiligen. Hierüber können pseudo Transaktionen durchgeführt sowie Mining betrieben werden. So befindet sich das Proof-of-Work im Frontend um ein verteiltes Mining zu simulieren. Entwickelt wurde es mittels Javascript, aufbauend auf dem Framework ReactJS.

### Backend-Server

Das Backend ist der Broker zwischen der Blockchain und dem Frontend. Mittels REST-API können Nutzer/Clients mit der Blockchain kommunizieren. Weiterhin wird durch den Server die Blockchain inizialisiert und Transaktionen angenommen sowie verifiziert. Umgesetzt wurde es mittels Python und dem Webframework Django.

### Blockchain

Die Blockchain ist eine minimalistische Implementierung mit den wesentlichen Komponenten die für eine Kryptowährung notwendig sind. Entwickelt ebenfalls in Python. Zur Vereinfachung wurde kein dezentraler Ansatz gewählt, sondern sätmliche Informationen und Transaktionen laufen an einem Punkt zusammen. 

## Weitere Informationen

Weitere Informationen stehen im Wiki des Projekts.

#### Projekt starten: 

```
https://github.com/DerAlexx/HMCoin/wiki/Start-des-Servers
```

#### Projekt bauen: 

```
https://github.com/DerAlexx/HMCoin/wiki/Bauen-des-Projekts
```

#### Projektstruktur: 

```
https://github.com/DerAlexx/HMCoin/wiki/Projektstruktur
```
