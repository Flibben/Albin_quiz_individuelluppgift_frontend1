Individuell uppgift - Quiz
Din uppgift �r att skriva en quiz-applikation. En quiz-applikation �r ett fr�gesport-spel.

Din applikation ska vara objektorienterad. Du ska visa att du kan skapa l�mpliga klasser. Det kommer att vara h�gre fokus p� det i denna uppgift �n i gruppuppgiften, eftersom ni kan b�rja att skriva era applikationer objektorienterat fr�n b�rjan nu.
Quizet ska h�lla reda p� en spelare. Det ska hantera spelarens namn, spelarens po�ng i den aktuella omg�ngen.
Fr�gorna ska l�sas in fr�n https://quizapi.io/ som levererar ett resultat i JSON.
Du m�ste anv�nda ditt omd�me och g�ra en analys av kraven f�r att kunna leva upp till dem.

G-krav

Spelet ska inneh�lla 10 fr�gor.
Man ska kunna v�lja flera svar. Ibland kan ett alternativ vara r�tt, ibland flera.
N�r omg�ngen �r slut ska po�ngen visas och anv�ndaren ska f� v�lja att starta ett nytt spel med nya fr�gor.
Skriv minst en klass som inneh�ller minst en metod och minst en egenskap.
Du f�r inte anv�nda inline-css eller inline-event (t ex <p style="color:red" onlick="something();">)
Du ska anv�nda minst en array-funktion.
L�mna in projektet som ett git-repo.
VG-krav:

Allt som ing�r f�r G-kraven.
L�t anv�ndaren best�mma hur m�nga fr�gor som ska visas. (5-10)
Du ska visa att du kan skapa l�mpliga klasser med l�mpliga metoder och egenskaper. Du f�r inte anv�nda globala variabler eller funktioner utanf�r klasser, f�rutom anonyma funktioner i event-lyssnare. (De beh�vs inte d�r heller, men du f�r.)
Du ska skriva en metod i en l�mplig klass som heter correct (eller liknande) och som tar emot minst tv� parametrar:
En HTML-collection (eller liknande, array, NodeList etc) som inneh�ller de svar anv�ndaren har kryssat i.
En array, ett objekt eller liknande , som inneh�ller de korrekta svaren.
Metoden ska kontrollera om anv�ndaren har svarat r�tt p� fr�gan. Om flera alternativ kan vara r�tt m�ste anv�ndaren ha kryssat i alla korrekta alternativ f�r att den ska r�knas som r�tt.

Du ska visa en fr�ga i taget och l�ta anv�ndaren bl�ddra mellan dem. Det kan t ex ske genom att byta ut elementen som inneh�ller fr�gan, eller elementens inneh�ll.
Visa vilken fr�ga anv�ndaren �r p�. (T ex 3 av 10.)
Du ska anv�nda minst en lambda-funktion.
Du ska l�mna in i tid, dvs om du f�r en restuppgift kommer du inte att kunna f� VG, enbart IG/G.
Redovisning sker genom ett kort, individuellt m�te den 12/13 oktober, troligen p� Zoom. �terkommer senare med ett schema d�r man f�r boka sin tid. Du ska ocks� l�mna in ett publikt github-repo.

F�r att alla ska f� lika mycket tid p� sig oavsett n�r man redovisar muntligt kommer ni att f� lov att l�mna in ert repo fram till onsdag den 14/10. Ni m�ste dock kunna visa upp ett n�gorlunda fungerande spel p� den muntliga redovisningen, tiden efter redovisningen �r bara t�nkt att anv�ndas f�r finjusteringar, mindre buggfixar osv.