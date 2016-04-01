# Part-up.com debug & optimise

## De opdracht
De opdracht die ik van Lifely gekregen heb is om de website Part-up.com sneller te maken. Hierbij is het de bedoeling dat ik de technieken gebruik die besproken zijn in de de vakken Browser Technologies en Performance Matters.

## Analyse

### afbeeldingen
Nog niet alle afbeeldingen op de website zijn optimaal voor het web. Door deze te verkleinen zal de laadtijd van de site korter worden omdat er minder gedownload hoeft te worden.

### First meaninful render
Tot dat alle content gedownload is ziet de gebruiker alleen maar een wit scherm. Op langzaam internet kan dat oplopen tot ruim een halve minuut.

### Caching
De website maakt al gebruik van caching maar nog niet optimaal. 

### Javascript
De website laat helemaal niets zien als javascript niet of niet goed wordt ingeladen. Dit is onduidelijk voor gebruikers.


## Verbeteringen/Aanbevelingen

### Afbeeldingen
Alle statische afbeeldingen die op de website te vinden zijn zijn samen 2.5 MB. Door deze afbeeldingen te optimaliseren heb ik hier 600 KB vanaf kunnen halen zonder qualiteit te verliezen. Dit lijkt niet heel veel, maar als je honderden of duizenden pagina's per dag moet verzorgen loopt het snel op.

Naast de statische afbeeldingen zijn er ook nog afbeeldingen die door de gebruikers geupload worden. Deze kunnen ook nog kleiner gemaakt worden. Om dit te doen zal er serverside een extra tool gebruikt moeten worden zoals [Smash.it](https://developer.yahoo.com/blogs/ydn/automatically-compressing-s3-images-using-smush-14941.html).

### First meaningful render
Om de first meaningful render te verbeteren heb ik twee relatief makkelijke oplossingen. 

De plugin meteor-inject-initial.

De plugin fast-render. Normaal laad meteor eerst de style van de website in, daarna alle javascript, en daarna alle bestanden die de hele applicatie kan geberuiken. Wat fast-render doet is 

51 sec ipv 47sec

### Javascript
Om het probleem op te lossen van de lege pagina bij het niet inladen van de javascript is het mogelijk om op de server een statische pagina te renderen en die als eerst naar de client te sturen.


## Resultaat

(getest op 750kb/s Download, 250kb/s upload, 100ms latency & cache disabled)

### Home page
|                            |Base  |Optimised|
|---------------------------:|------|---------|
|**Page size**               |4.1 MB|         |
|**First Meaningful Render** |46.0 S|         |
|**Total loadtime**          |54.6 S|         |







