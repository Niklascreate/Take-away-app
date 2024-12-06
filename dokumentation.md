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
1. **Landningssidan**  
   - Första sidan du ser är landningssidan.  
   - För att komma vidare, tryck på loggan som guppar upp och ner.

2. **Menyn**  
   - Här kan du bläddra bland maträtter och drycker.  
   - Tryck på en maträtt eller dryck för att få mer information och lägga till i varukorgen.

3. **Navigeringsfältet (Navbar)**  
   - Längst ner på skärmen finns en navbar.  
   - När du lagt till produkter i varukorgen, kan du gå in där för att se en översikt.

4. **Varukorgen**  
   - Här ser du alla produkter du lagt till och kan välja att ta bort dem.  
   - Fyll i alla nödvändiga uppgifter innan du går vidare till "Beställ".  

5. **Orderbekräftelse**  
   - På denna sida får du en sista chans att ändra din order innan den låses av restaurangen.  
   - När din order låsts får du ett meddelande om att den är klar att hämta.

---

## Adminsidans funktioner

### Tillgängliga åtgärder
1. **Lås en maträtt eller order.**  
2. **Uppdatera antal.**  
3. **Lägg till en kommentar som skickas med ordern.**  
4. **Bekräfta en order.**  
   - Orderstatus ändras från "inte klar" till "klar".  
5. **Ta bort en order.**

---

## Kända buggar

1. **Orderbekräftelsesidan**  
   - Om sidan stängs ner går det inte att komma tillbaka till den, eftersom kunden inte har inloggning.

2. **Ta bort låst order**  
   - Om en order är låst går det inte att ta bort den.

3. **Uppdatering av antal**  
   - Om antal ändras på adminsidan uppdateras inte ändringen på orderbekräftelsesidan.

4. **Ändring av antal efter låsning**  
   - När en order är låst på orderbekräftelsesidan kan kunden fortfarande ändra antal, men inte ta bort produkter.
