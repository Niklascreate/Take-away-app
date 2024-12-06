# Dokumentation av applikationen - Strömming på språng

## Beskrivning
Denna applikation fungerar på alla skärmstorlekar, men rekommenderas att testas på mobil för bästa upplevelse.

### URL: http://herringbucket.s3-website.eu-north-1.amazonaws.com


### Inloggningsuppgifter
- **Användarnamn**: admin  
- **Lösenord**: admin123

---

## Guide för användning

### Allmänt
För att testa applikationen rekommenderas det att ha två vyer öppna samtidigt. Detta gör det möjligt att låsa en order från adminsidan och se hur orderstatus uppdateras.

### Steg-för-steg:

   1. Första sidan du ser är landningssidan.
      
   3. För att komma vidare, tryck på loggan som guppar upp och ner.

   4. Här kan du bläddra bland maträtter och drycker.
      
   5. Tryck på en maträtt eller dryck för att få mer information och lägga till i varukorgen.

   6. Längst ner på skärmen finns en navbar.
      
   7. När du lagt till produkter i varukorgen, kan du gå in där för att se en översikt.

   8. Här ser du alla produkter du lagt till och kan välja att ta bort dem.
      
   9. Fyll i alla nödvändiga uppgifter innan du går vidare till "Beställ".

   10. På denna sida får du en sista chans att ändra din order innan den låses av restaurangen.
       
   11. När din order låsts får du ett meddelande om att den är klar att hämta.

---

## Adminsidans funktioner

1. Lås en maträtt eller order. 
2. Uppdatera antal. 
3. Lägg till en kommentar som skickas med ordern.
4. Bekräfta en order, orderstatus ändras från "inte klar" till "klar".  
5. Ta bort en order.

---

## Buggar

1. Om sidan stängs ner går det inte att komma tillbaka till den, eftersom kunden inte har inloggning.

2. Om en order är låst går det inte att ta bort den.

3. Om antal ändras på adminsidan uppdateras inte ändringen på orderbekräftelsesidan.

4. När en order är låst på orderbekräftelsesidan kan kunden fortfarande ändra antal, men inte ta bort produkter.
