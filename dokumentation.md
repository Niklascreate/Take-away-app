# Dokumentation av applikationen - Strömming på språng .

## Testa gärna i mobil annars fungerar den i samtliga storlekar.

## URL: ``` http://herringbucket.s3-website.eu-north-1.amazonaws.com ```

## Inloggsningsuppgifter:
<br>
``` Användarnamn: admin
    Lösenord: admin123
```

# Guide 

###För att testa denna applikation är det bra att ha två vyer öppna samtidigt. Detta gör det möjligt att låsa en order från adminsidan och se när ordern skickas.

###Först kommer du till landningssida. För att komma vidare tryck på loggan som guppar upp och ner.

###Nu har du kommit till meny. Tryck på en maträtt eller dryck för att få mer information och lägg i varukorg.

###Längst ner i bild har du en navbar. Nu har din varukorg uppdaterats och du kan gå in där.

###Inne i varukorgen får man en översikt och här man kan välja att ta bort en produkt. Innan man går vidare till beställ måste man fylla i samtliga uppgifter innan man kan gå vidare. Tryck på beställ.

###Nu har du kommit till orderbekräftelsesidan och här får man en sista möjlighet att ändra sin order innan den blir låst av restaurangen. När din order är låst kommer du få ett meddelande att den är klar att hämta.

<br>

## Adminsidans funktioner

## Lås en maträtt eller order.

## Uppdatera antal.

## Lägg till en kommentar som skickas med.

## Bekräfta order och då ändras status från - inte klar till - klar.

## Ta bort order.


# Buggar

## Om man stänger ner orderbekräftelsesidan går det inte att komma tillbaka till den, eftersom vi inte har någon inloggning för kunden.

## Om man har låst en order så går det inte att ta bort den sedan.

## Om man ändrar antal på adminsidan uppdateras det inte på orderbekräftelsesidan.

## När ordern är låst för kunden på orderbekräftelsesidan kan kunden fortfarande ändra antal, men inte ta bort.
