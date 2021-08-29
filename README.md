# REST-API
REST-API in NodeJS with express


## Beskrivning
    ***Uppgift 3: Individuell inlämning i kursen Webbutveckling.***
    Projektet består av en resurs, ***product***, som har egenskaperna: id, name, type, price. Vad de olika egenskaperna lagrar för typ av information valideras genom funktion i ***product.validation.js***. Sparad data lagras i json format i ***products.json***.

## Vilka krav som är uppfyllda
    Krav för godkänt:
    1. JA
    2. JA
    3. JA, brutit ut så den ligger i ***products.controller.js***
    4. JA, tränat på att skapa branches
    5. JA
    6. JA,

    Krav för väl godkänt:
    1. JA
    2. JA
    3. JA
    4. NEJ - endast påbörjad
    5. JA

## info om hur projektet byggs och körs
    REST-API körs på localhost port 3003, startas genom komandot "npm start" i terminalen
    Api är byggt för att hantera data i json-format. Det läser från och skirver till filen products.json.

    Det publika gränssnittet** startas separat genom hmk i index.html-filen och välj "open with live server". Det byggs mha script.js och sylas med länkade css filer.

    **Publika gränssnittet är inte komplett och fulltfungerande, det är en påbörjan av VG krav som ej är slutfört enligt kraven.





### Uppgiftsbeskrivning

Krav för godkänt:
1. Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs)
2. Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http)
3. Datan som API:et hanterar sparas lokalt i serverfilen
4. Git & GitHub har använts
5. Projektmappen innehåller en README.md fil - (läs ovan för mer info)
6. Uppgiften lämnas in i tid!

Krav för väl godkänt:
1. Alla punkter för godkänt är uppfyllda
2. All data skall vara sparad i en JSON-fil istället för i serverfilen
3. Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort
4. Ett simpelt klient-gränssnitt skall finnas för att anropa API:ets olika endpoints, samt
visa upp resultatet vid GET anrop
5. Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt