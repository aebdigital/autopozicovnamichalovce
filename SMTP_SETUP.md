# Nastavenie SMTP2GO pre Darius Garage

Tento projekt využíva **SMTP2GO API** na odosielanie e-mailov z kontaktného formulára a rezervačného systému.

## 🔑 Požadované premenné prostredia (.env)

Pre správne fungovanie odoielania e-mailov je potrebné pridať nasledujúce kľúče do súboru `.env` alebo `.env.local`:

```env
# SMTP2GO API Kľúč (nájdete v SMTP2GO dashboarde pod Settings -> API Keys)
SMTP2GO_API_KEY=api-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Odosielateľ e-mailov (musí byť overená doména v SMTP2GO)
SMTP2GO_SENDER=info@dariusgarage.sk

# Adresa, kam chodia správy z kontaktného formulára (voliteľné, predvolené: info@dariusgarage.sk)
CONTACT_FORM_RECIPIENT=info@dariusgarage.sk

# Adresa, kam chodia nové rezervácie (voliteľné, predvolené: info@dariusgarage.sk)
RESERVATION_RECIPIENT=info@dariusgarage.sk
```

## 📂 Súbory zabezpečujúce e-maily:

### 1. `src/lib/email.ts`
- Jadro systému, ktoré komunikuje priamo s SMTP2GO API (`https://api.smtp2go.com/v3/email/send`).
- Obsahuje funkciu `sendEmail`, ktorá sa stará o formátovanie a odoslanie požiadavky.

### 2. `src/app/api/contact/route.ts`
- Spracováva správy z kontaktného formulára.
- Odosiela notifikáciu adminovi na `info@dariusgarage.sk`.

### 3. `src/app/api/reservation/route.ts`
- Spracováva nové rezervácie áut.
- Odosiela detailný prehľad rezervácie adminovi.
- Odosiela potvrdenie o prijatí požiadavky aj zákazníkovi.

## 🚀 Tok údajov (Flow):

1. **Používateľ** vyplní formulár na webe (Kontakt alebo Rezervácia).
2. **Frontend** odošle dáta na príslušnú API trasu (`/api/contact` alebo `/api/reservation`).
3. **Server (Next.js)** validuje údaje a zavolá `sendEmail` z knižnice `lib/email`.
4. **SMTP2GO** spracuje požiadavku a doručí e-mail do schránky.
5. **Používateľ** uvidí potvrdenie o úspešnom odoslaní priamo na webe.

## 🛠 Riešenie problémov:

- **E-maily nechodia:** Skontrolujte, či je váš `SMTP2GO_API_KEY` správny a aktívny.
- **Chyba odosielateľa:** Uistite sa, že adresa v `SMTP2GO_SENDER` patrí pod doménu, ktorú máte v SMTP2GO overenú (Sender Domains).
- **Logy:** V prípade chyby server vráti status 500 a podrobnosti vypíše do konzoly (v produkcii do logov hostingu).
