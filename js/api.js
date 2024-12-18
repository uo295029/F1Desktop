class Juego {

    constructor() {
        this.fotos = [
            {
                element: "Max Verstappen",
                source: "multimedia/imagenes/max_verstappen.png",
                cover: "multimedia/imagenes/Red_Bull_Racing_logo.svg",
                team: "Red bull",
                audio: "multimedia/audios/holanda.mp3"
            },
            {
                element: "Checo Perez",
                source: "multimedia/imagenes/checo_perez.png",
                cover: "multimedia/imagenes/Red_Bull_Racing_logo.svg",
                team: "Red bull",
                audio: "multimedia/audios/mexico.mp3"
            },
            {
                element: "Charles Leclerc",
                source: "multimedia/imagenes/charles_leclerc.png",
                cover: "multimedia/imagenes/Scuderia_Ferrari_Logo.svg",
                team: "Ferrari",
                audio: "multimedia/audios/monaco.mp3"
            },
            {
                element: "Carlos Sainz Jr",
                source: "multimedia/imagenes/carlos_sainz.png",
                cover: "multimedia/imagenes/Scuderia_Ferrari_Logo.svg",
                team: "Ferrari",
                audio: "multimedia/audios/espana.mp3"
            },
            {
                element: "Fernando Alonso",
                source: "multimedia/imagenes/fernando_alonso.png",
                cover: "multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg",
                team: "Aston Martin",
                audio: "multimedia/audios/espana.mp3"
            },
            {
                element: "Lance Stroll",
                source: "multimedia/imagenes/lance_stroll_tarjeta.png",
                cover: "multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg",
                team: "Aston Martin",
                audio: "multimedia/audios/canada.mp3"
            },
        ];
        this.nombres = [
            {
                element: "Max Verstappen"
            },
            {
                element: "Checo Perez"
            },
            {
                element: "Charles Leclerc"
            },
            {
                element: "Carlos Sainz Jr"
            },
            {
                element: "Fernando Alonso"
            },
            {
                element: "Lance Stroll"
            },
        ];
        this.crearEstructura();
        this.handleDragEvents();
        this.sonando = null;
        this.bloqueado = false;
    }

    crearEstructura() {
        const main = document.querySelector("main");
        const ayuda = document.createElement("section");
        const p = document.createElement("p");
        p.textContent = "Adivina los pilotos por su escudería y el himno de su país, arrastra el nombre del piloto hasta la tarjeta que creas correspondiente";
        ayuda.appendChild(p);
        main.appendChild(ayuda);
        const section = document.createElement("section");
        const h3 = document.createElement("h3");
        h3.textContent = "Realciona";
        const button = document.createElement("button");
        button.textContent = "Expandir";
        section.appendChild(h3);
        this.crearTarjetas(section);
        this.crearDraggables(section);
        button.addEventListener("click", function() {
            var sectionToExpand = document.querySelectorAll("section")[1];
            if(document.webkitFullscreenElement) {
                document.webkitCancelFullScreen();
                this.textContent = "Expandir";
            }
            else {
                sectionToExpand.webkitRequestFullScreen();
                this.textContent = "Comprimir";
            };
        });
        section.appendChild(button);
        main.appendChild(section);
    }

    crearDraggables(section) {
        this.nombres.forEach(e => {
            const article = document.createElement("article");
            const h3 = document.createElement("h3");
            article.setAttribute("data-element", e.element);
            article.setAttribute("draggable", true);
            h3.textContent = e.element;
            article.appendChild(h3);
            section.appendChild(article);
        });
    }

    crearTarjetas(section) {
        this.fotos.sort(() => Math.random() - 0.5);
        this.fotos.forEach(e => {
            const card = document.createElement("article");
            const h4 = document.createElement("h4");
            const img = document.createElement("img");
            const cover = document.createElement("img");
            card.setAttribute("data-element", e.element);
            card.setAttribute("data-state", "unflipped");
            h4.textContent = "Piloto";
            img.src = e.source;
            img.alt = e.element;
            cover.src = e.cover;
            cover.alt = e.team;
            card.appendChild(h4);
            card.appendChild(img);
            card.appendChild(cover);
            card.addEventListener('click', () => {this.girarTarjeta.bind(card);this.reproducir(e.audio); });
            section.appendChild(card);
        });
    }

    girarTarjeta() {
        this.dataset.state = "flipped";
    }

    reproducir(audio) {
        if(this.bloqueado) return;
        this.bloquearAudio();
        if(this.sonando !== null) {
            this.sonando.stop();
            this.sonando = null;
        } else {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const audioNode = audioContext.createBufferSource();
            
            fetch(audio)
                .then(response => response.arrayBuffer())
                .then(buffer => audioContext.decodeAudioData(buffer))
                .then(decodedData => {
                    audioNode.buffer = decodedData;
                    audioNode.connect(audioContext.destination);
                    audioNode.start();
                    this.sonando = audioNode;
                })
                .catch(error => console.error('Error al cargar y reproducir el audio:', error));
        }
    }

    bloquearAudio() {
        this.bloqueado = true;
        setTimeout(() => {
            this.bloqueado = false;
        }, 500); 
    }

    handleDragEvents() {
        let drag = null;
        let self = this;

        this.handleTouchStart = (e) => {
            drag = e.target?.closest('article');
            if (drag && drag.textContent === "Piloto") {
                drag = null;
            }
        };

        this.handleTouchMove = (e) => {
            e.preventDefault();
        };

        this.handleTouchEnd = (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const target = document.elementFromPoint(touchEndX, touchEndY)?.closest('article');
    
            if (target && drag && drag.textContent === target.dataset.element && target.dataset.state !== 'confirmed') {
                target.dataset.state = 'confirmed';
                drag.dataset.state = 'confirmed';
                this.checkWinCondition();
            }
            drag = null;
        };
        
        this.handleDragStart = function (e) {
            drag = this;
        };
        
        this.handleDragOver = function (e) {
            if (e.preventDefault) e.preventDefault();
        };
        
        this.handleDrop = function (e) {
            e.stopPropagation();
            const targetElement = this.dataset.element;
            if (drag.dataset.element === targetElement && this.dataset.state !== 'confirmed' && drag.dataset.state !== "confirmed") {
                this.dataset.state = 'confirmed';
                drag.dataset.state = 'confirmed';
                self.checkWinCondition();
            }
        };

        this.checkWinCondition = () => {
            const articles = document.querySelectorAll("article");
            const confirmedElements = Array.from(articles).filter(article => article.dataset.state === 'confirmed');
    
            if (confirmedElements.length === 12) {
                setTimeout(() => {
                    const section = document.querySelectorAll("section")[1];
                    const p = document.createElement("p");
                    p.textContent = "¡¡¡FELICIDADES!!! Has ganado el juego";
                    section.appendChild(p);
                }, 500);
            }
        };

        const articles = document.querySelectorAll("article");
        articles.forEach((article) => {
            article.addEventListener('dragstart', this.handleDragStart.bind(article));
            article.addEventListener('dragover', this.handleDragOver.bind(article));
            article.addEventListener('drop', this.handleDrop.bind(article));
            article.addEventListener('touchstart', this.handleTouchStart);
            article.addEventListener('touchend', this.handleTouchEnd);
            article.addEventListener('touchmove', this.handleTouchMove);
        });
    }
}