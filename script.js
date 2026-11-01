(() => {
    const $ = (id) => document.getElementById(id);

    // 1. OPENING ENVELOPE

    const envelopeButton = $("envelope-button");
    const introScreen = $("intro-screen");
    const mainSite = $("main-site");

    let websiteOpened = false;

    // 2. TYPING EFFECT

    const typedHeading = $("typed-heading");
    const headingText = "you arrived.";

    function typeBirthdayHeading() {
        if (!typedHeading) return;

        typedHeading.textContent = "";

        let index = 0;

        function typeNext() {
            if (index < headingText.length) {
                typedHeading.textContent += headingText.charAt(index);
                index++;
                setTimeout(typeNext, 100);
            }
        }

        typeNext();
    }

    envelopeButton?.addEventListener("click", () => {
        if (websiteOpened) return;

        websiteOpened = true;
        envelopeButton.classList.add("is-open");

        setTimeout(() => {
            introScreen?.classList.add("is-opening");
            mainSite?.removeAttribute("inert");

            setTimeout(() => {
                if (introScreen) introScreen.hidden = true;

                typeBirthdayHeading();
                startFloatingHearts();
            }, 750);
        }, 650);
    });


    // 3. BIRTHDAY COUNTDOWN — 2 NOVEMBER

    const birthdayMonth = 11;
    const birthdayDay = 2;

    function getNextBirthday() {
        const now = new Date();

        const birthdayStart = new Date(
            now.getFullYear(),
            birthdayMonth - 1,
            birthdayDay,
            0, 0, 0
        );

        const birthdayEnd = new Date(
            now.getFullYear(),
            birthdayMonth - 1,
            birthdayDay + 1,
            0, 0, 0
        );

        // Birthday ke poore din ke baad next year ki date
        if (now >= birthdayEnd) {
            return new Date(
                now.getFullYear() + 1,
                birthdayMonth - 1,
                birthdayDay,
                0, 0, 0
            );
        }

        return birthdayStart;
    }

    let nextBirthday = getNextBirthday();

    function updateCountdown() {
        const now = new Date();

        const isBirthday =
            now.getMonth() === birthdayMonth - 1 &&
            now.getDate() === birthdayDay;

        const message = $("countdown-message");

        if (isBirthday) {
            ["days", "hours", "minutes", "seconds"].forEach((id) => {
                const element = $(id);
                if (element) element.textContent = "00";
            });

            if (message) {
                message.textContent = "Happy Birthday, Bestu! 🎂♡";
            }

            return;
        }

        nextBirthday = getNextBirthday();

        const difference = Math.max(
            0,
            nextBirthday.getTime() - now.getTime()
        );

        const values = {
            days: Math.floor(difference / 86400000),
            hours: Math.floor((difference % 86400000) / 3600000),
            minutes: Math.floor((difference % 3600000) / 60000),
            seconds: Math.floor((difference % 60000) / 1000)
        };

        Object.entries(values).forEach(([id, value]) => {
            const element = $(id);

            if (element) {
                element.textContent = String(value).padStart(2, "0");
            }
        });

        if (message) {
            message.textContent =
                "Every second brings us closer to your special day ♡";
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // 4. MOBILE NAVBAR

    const menuToggle = $("menu-toggle");
    const navLinks = $("nav-links");

    menuToggle?.addEventListener("click", () => {
        if (!navLinks) return;

        const isOpen = navLinks.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navLinks?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("is-open");

            menuToggle?.setAttribute("aria-expanded", "false");

            if (menuToggle) {
                menuToggle.textContent = "☰";
            }
        });
    });


    // 5. CONFETTI ANIMATION

    const confettiContainer = $("confetti-container");

    const confettiColors = [
        "#f0a9bd",
        "#fbe1e9",
        "#d8bb8a",
        "#ffffff",
        "#d783a5"
    ];

    function launchConfetti(amount = 80) {
        if (!confettiContainer) return;

        const safeAmount = Math.min(amount, 150);

        for (let i = 0; i < safeAmount; i++) {
            const piece = document.createElement("span");

            piece.className = "confetti-piece";
            piece.style.left = Math.random() * 100 + "vw";

            piece.style.backgroundColor =
                confettiColors[
                    Math.floor(Math.random() * confettiColors.length)
                ];

            piece.style.setProperty(
                "--fall-duration",
                (2 + Math.random() * 2.5) + "s"
            );

            piece.style.setProperty(
                "--drift",
                (Math.random() * 240 - 120) + "px"
            );

            piece.style.animationDelay =
                Math.random() * 0.6 + "s";

            confettiContainer.appendChild(piece);

            piece.addEventListener(
                "animationend",
                () => piece.remove(),
                { once: true }
            );
        }
    }


    // 6. FLOATING HEARTS

    const heartsContainer = $("hearts-container");
    let heartTimer = null;

    function createFloatingHeart() {
        if (
            !heartsContainer ||
            document.hidden ||
            heartsContainer.childElementCount > 15
        ) {
            return;
        }

        const heart = document.createElement("span");

        heart.className = "heart-particle";
        heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
        heart.style.left = Math.random() * 95 + "vw";

        heart.style.fontSize =
            (12 + Math.random() * 17) + "px";

        heart.style.setProperty(
            "--duration",
            (5 + Math.random() * 4) + "s"
        );

        heartsContainer.appendChild(heart);

        heart.addEventListener(
            "animationend",
            () => heart.remove(),
            { once: true }
        );
    }

    function startFloatingHearts() {
        if (heartTimer !== null) return;

        createFloatingHeart();

        heartTimer = setInterval(createFloatingHeart, 1100);
    }


    // 7. BIRTHDAY CAKE

    const cakeButton = $("cake-button");
    const cakeEmoji = $("cake-emoji");
    const cakeMessage = $("cake-message");

    let candlesBlownOut = false;

    cakeButton?.addEventListener("click", () => {
        if (!cakeEmoji || !cakeMessage) return;

        candlesBlownOut = !candlesBlownOut;

        if (candlesBlownOut) {
            cakeEmoji.textContent = "🍰";

            cakeMessage.textContent =
                "Wish made! May every beautiful dream come true. ♡";

            cakeButton.setAttribute(
                "aria-label",
                "Candles blown out. Tap to relight the cake."
            );

            launchConfetti(80);
        } else {
            cakeEmoji.textContent = "🎂";

            cakeMessage.textContent =
                "Candles are back! Make another wish, Bestu. ♡";

            cakeButton.setAttribute(
                "aria-label",
                "Blow out the birthday cake candles"
            );
        }
    });


    // 8. BIRTHDAY SURPRISE BUTTON

    const surpriseButton = $("surprise-button");
    const surpriseReveal = $("surprise-reveal");

    surpriseButton?.addEventListener("click", () => {
        if (!surpriseReveal || !surpriseReveal.hidden) return;

        surpriseReveal.hidden = false;
        surpriseButton.textContent = "Your Surprise Is Opened ♡";
        surpriseButton.disabled = true;

        surpriseButton.setAttribute("aria-expanded", "true");

        launchConfetti(120);

        surpriseReveal.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });


    // 9. SECRET MESSAGE

    const secretButton = $("secret-button");
    const secretMessage = $("secret-message");

    secretButton?.addEventListener("click", () => {
        if (!secretMessage) return;

        const showMessage = secretMessage.hidden;

        secretMessage.hidden = !showMessage;

        secretButton.setAttribute(
            "aria-expanded",
            String(showMessage)
        );

        secretButton.textContent = showMessage
            ? "Hide My Secret Message 💗"
            : "Reveal My Secret Message 🔐";

        if (showMessage) {
            secretMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });


    // 10. WEBSITE READY

    console.log("Midnight Rose Birthday Website is ready! ♡");

})();
