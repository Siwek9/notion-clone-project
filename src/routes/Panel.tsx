import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";

export function Panel() {
    const navigate = useNavigate();

    const text = `
Źródło: https://aniagotuje.pl/przepis/bigos

# Przepis na bigos

Zobacz jak smakuje prawdziwy bigos tradycyjny. Poznaj mój sprawdzony przepis na bigos z dużą ilością różnych mięs, z suszonymi grzybami, śliwkami i idealnie dobranymi przyprawami. To danie, które Cię zachwyci.

### Czas przygotowania: 2 godziny

### Czas duszenia: 2 dni

### Liczba porcji: 5 kg bigosu

### W 100 g bigosu:
#### Wartość energetyczna: 190 kcal

### Dieta: bezglutenowa


## Składniki:

- 1 kg kapusty świeżej - pół średniej główki
- 2 kg kapusty kiszonej + 2,5 szklanki wody do gotowania
- 80 g suszonych grzybów + 500 ml wody do moczenia
- 500 g łopatki wieprzowej
- 300 g łopatki wołowej
- 500 g boczku surowego bez skóry
- 500 g schabu wieprzowego od karku
- 50 g smalcu wieprzowego
- 180 g kiełbasy myśliwskiej podwędzanej
- 150 g boczku surowego wędzonego
- 150 g boczku parzonego wędzonego
- 2 duże cebule - do 400 g
- 50 g suszonych śliwek bez pestek - lub więcej
- 1 szklanka czerwonego, wytrawnego wina - można pominąć
- przyprawy i zioła: 5 ziaren ziela angielskiego, łyżeczka czarnego pieprzu, 5 liści laurowych, 1 goździk, 2 ziarna jałowca


## Krok 1: Namocz grzyby
Szykowanie bigosu zacznij od namoczenia suszonych grzybów. 80 gramów suszonych grzybów, to trochę więcej niż dwie garście grzybków. Suszone grzyby umieść w większym naczyniu i zalej dwiema szklankami zimnej wody... może być woda z kranu. 

Miseczkę przykryj np. talerzykiem i odstaw w suche i chłodne miejsce na 12 godzin, a najlepiej na całą noc. Grzyby wchłoną część wody i zmiękną. 

## Krok 2: Posiekaj grzyby
Odcedź grzyby z wody, ale wody nie wylewaj. Wodę z moczenia grzybów dodajemy potem do bigosu. Odcedzone grzyby posiekaj na drobne paski. 

Krok 3: Zacznij od kapusty kiszonej
Dwa kilogramy kapusty kiszonej odciśnij dokładnie z wody a następnie posiekaj. Kapustę umieść w garnku. Wlej dwie i pół szklanki zwykłej wody z kranu lub wody filtrowanej (mniej lub więcej, ale tyle, by przykryć wodą kapustę). [Kapusta kiszona](https://aniagotuje.pl/przepis/kapusta-kiszona) z mojego przepisu będzie idealna o bigosu. 

Porada: Je nie płuczę kapusty kiszonej, ale odciskam ją ze słono kwaśnej wody. Dla mnie to taki kompromis smakowy. Jeśli wolisz bardziej kwaśny bigos, to nie odciskaj kapusty z wody. Jeśli zaś lubisz bigos bardzo łagodny, to możesz odciśniętą w wody kapustę kiszonką jeszcze dodatkowo przepłukać w zimnej wodzie i raz jeszcze odcisnąć. Zawsze polecam też najpierw sprawdzić smak kiszonej kapusty, bowiem jedne są mniej kwaśne i słone a inne bardziej. 

## Krok 4: Dodaj kapustę białą
Małą główkę białej kapusty lub też pół większej główki (łącznie jeden kilogram) posiekaj i umieść na sitku w zlewie. Sparz kapustę wrzątkiem z czajnika. Sparzoną kapustę umieść w garnku razem z kapustą kiszoną. Garnek przykryj przykrywką. Zagotuj całość a następnie zmniejsz moc palnika do takiej, by kapusty tylko lekko mrugały. Gotuj je tak przez godzinę pod przykrywką. 

_Porada_: Jeśli chcesz zrobić bigos wyłącznie z użyciem świeżej kapusty (główka kapusty "słodkiej") z pominięciem kapusty kiszonej, to wystarczy, że do bigosu dodasz około jednego kilograma tartych na tarce, kwaśnych i twardych jabłek. Np. na dwa kilogramy kapusty dajemy jeden kilogram jabłek. Jabłka dodajemy wówczas pod koniec szykowania bigosu. 

## Krok 5: Przygotuj mięsa
W trakcie gotowania się kapusty przygotuj mięso. Surowe mięsa pokrój na małe kawałki: 500 g łopatki wieprzowej, 300 g łopatki wołowej, 500 g schabu wieprzowego od karku, 500 g boczku surowego bez skóry. Przygotuj też 50 g smalcu wieprzowego.

Im więcej różnych mięs, tym bogatszy smak bigosu. Jak jednak wspomniałam wcześniej, możesz śmiało zrezygnować nawet z połowy mięs. Wówczas wszystkie inne składniki dajemy w tych samym ilościach. Jeśli zaś masz dostęp do dobrej jakości dziczyzny (mięso z dzika, sarny, kaczki lub zająca), to polecam zrezygnować np. ze schabu wieprzowego, na rzecz dziczyzny. 

## Krok 6: Gotuj bigos
Smalec roztop na dużej patelni a następnie wyłóż też razem wszystkie rodzaje pokrojonego mięsa. Mięso podsmażaj tak na średniej mocy palnika przez 40 minut. Co kilka minut zamieszaj całość przy pomocy drewnianej łyżki. 

Po godzinie gotowania kapustę razem z wodą przełóż do bardzo dużego garnka. Dodaj wszystkie przyprawy i zioła: 5 ziaren ziela angielskiego, łyżeczka czarnego pieprzu, 5 liści laurowych, 1 goździk, 2 ziarna jałowca. Wlej też wodę, która została z moczenia grzybów (jeśli nie jest gorzka) oraz dodaj posiekane grzyby. Dokładnie wszystko wymieszaj.

Porada: Do bigosu możesz też śmiało dodać (oprócz wyżej wymienionych przypraw) gotową mieszankę przypraw do bigosu. To dobry sposób na doprawienie bigosu, gdy brakuje nam np. jałowca lub goździków. W gotowych mieszankach zazwyczaj je znajdziecie. Wystarczy jedna saszetka o wadze 20 gramów. Jeśli zaś dysponujesz wyłącznie mieszanką przypraw, to możesz dodać do 40 gramów mieszanki przypraw do bigosu. 

## Krok 7: Dodaj mięsa
Kolejno dodaj też podsmażone na patelni mięso. Całość wymieszaj i przykryj przykrywką. Bigos gotuj cały czas na bardzo małej mocy palnika. Mieszaj, by się nie przypalił. 

## Krok 8: Podsmaż cebulę z boczkiem
Na samym końcu przygotuj cebule oraz wędzonki. Potrzebujesz dwie duże cebule, po 150 gramów boczku wędzonego surowego i parzonego oraz 180 g kiełbasy myśliwskiej podwędzanej. W pierwszej kolejności pokrój w kostkę boczek parzony i umieść go na patelni po mięsie. Gdy wytopisz już z boczku tłuszcz dodaj posiekaną cebulę. Po pięciu minutach podsmażania dodaj też pokrojony w kostkę boczek surowy wędzony. Podsmażaj całość dziesięć minut. 

Porada: Możesz też użyć wyłącznie kiełbasy a najlepiej po kawałku różnych kiełbas (Kiełbas nie trzeba wcześniej podsmażać... szczególnie tych podsuszanych). Możesz też użyć wyłącznie boczku wędzonego. Całkowicie dozwolone jest też dodanie pokrojonych w kosteczkę kawałków pieczeni, które zostały Ci z poprzednich obiadów np. pieczony schab lub karkówka. 

## Krok 9: Dokończ bigos
Po tym czasie całą zawartość patelni przełóż do garnka z gotującym się bigosem. Kiełbasę pokrój w kostkę i dodaj go bigosu. Posiekaj też drobno minimum 50 gramów suszonych śliwek. Jeśli nie masz śliwek suszonych, to bardzo dobrze sprawdzą się też domowe powidła śliwkowe. Wszystko bardzo dokładnie wymieszaj. 

Bigos gotuj na minimalnej mocy palnika przez cztery godziny. Jeśli planujesz dodać do bigosu czerwone wino, to zrób to pierwszego lub ostatniego dnia gotowania bigosu. Szklankę dobrego czerwonego wina lub też madery wlej do bigosu zaraz po dodaniu ostatnich składników lub też na dwie godziny przed wyłączeniem bigosu w dniu w którym chcesz go podać. 

Przynajmniej co 30 minut zaglądaj do bigosu i mieszaj go przy pomocy drewnianej łyżki, bowiem bigos lubi się przypalać. Następnego dnia ponownie podgrzewaj bigos przez przynajmniej dwie godziny. Bigos gotowy jest do jedzenia już pierwszego dnia, jednak podgrzewany drugiego lub nawet trzeciego, czy czwartego dnia robi się coraz lepszy.

Pod koniec gotowania bigosu można też dodać przecier pomidorowy, jednak kuchnia staropolska nie znała kiedyś takiego dodatku. Ja przecieru nie dodaję, ale jeśli macie ochotę, to możecie wzbogacić smak bigosu o kila łyżek przecieru lub koncentratu z pomidorów, czy też posiekanych świeżych pomidorów bez skórki. 

Jeśli lubisz bardziej tłusty bigos, to śmiało.. dodaj więcej dobrej jakości smalcu wieprzowego lub też smalcu z gęsi. W razie potrzeby dodaj też do bigosu trochę soli lub też pieprzu, czy cukru. Jest jeszcze kwestia sporna, czyli szykowanie zasmażki do bigosu. Według mnie nie ma takiej potrzeby. Bogaty w składniki i długo duszony bigos będzie gęsty i zawiesisty bez zasmażki. 

**Bigos** polecam podawać bardzo gorący. Domowy bigos najlepiej smakuje z ciemnym pieczywem, ziemniakami oraz różnymi kluskami z ziemniaków. Koniecznie piszcie jakie są Wasze sprawdzone sposoby na pyszny bigos oraz smaczny sposób podania.
Powodzenia!

`;
    return (
        <>
            <header>
                <div className="leftPart">
                    <img src="/src/assets/seton.png" alt="logo" />
                </div>
                <div className="rightPart">
                    O profil |&nbsp;
                    <span
                        onClick={() => {
                            const session_id =
                                localStorage.getItem("session_id");
                            if (session_id == null) {
                                navigate("/");
                                return;
                            }

                            const formData = {
                                session_id: session_id,
                            };
                            fetch("http://127.0.0.1:8000/log-out", {
                                method: "POST",
                                body: JSON.stringify(formData),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                                .then((res) => res.json())
                                .then(() => {
                                    localStorage.removeItem("session_id");
                                    navigate("/");
                                });
                            // navigate("/");
                        }}
                    >
                        WYLOGUJ
                    </span>{" "}
                </div>
            </header>
            <div className="noteContainer">
                <div className="notesList">Notatki:</div>
                <div className="note">
                    <main className="markdown">
                        <Markdown className="klasa" remarkPlugins={[remarkGfm]}>
                            {text}
                        </Markdown>
                    </main>
                </div>
            </div>
        </>
    );
}
