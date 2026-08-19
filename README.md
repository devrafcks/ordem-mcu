# Ordem MCU

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No build step](https://img.shields.io/badge/build-none-lightgrey?style=flat-square)
![Status](https://img.shields.io/badge/status-active-success?style=flat-square)

![Ordem MCU](assets/image.png)

## Sobre o projeto

Site estático que organiza toda a linha do tempo do Universo Cinematográfico Marvel por fase, da Fase 1 até a Fase 6, incluindo os filmes e as séries do Disney+. Também reúne, em uma seção separada, o antigo universo Fox de X-Men, Wolverine, Deadpool e Logan.

Cada título é exibido em um card com capa, nome e ano de lançamento, distribuídos em uma linha do tempo vertical com navegação rápida entre as fases.

## Tecnologias

O projeto é construído apenas com HTML, CSS e JavaScript puro, sem framework, sem bundler e sem dependências de build. Basta abrir o `index.html` em um navegador ou servir a pasta com qualquer servidor estático.

## Estrutura de pastas

```
Marvel/
├── index.html          Estrutura e conteúdo das fases
├── style.css            Estilos, tema escuro e responsividade
├── script.js             Parallax da hero e navegação ativa
├── README.md
└── assets/
    ├── image.png          Imagem de fundo da hero
    └── posters/            Capas dos filmes e séries
```

## Rodando localmente

```bash
git clone https://github.com/devrafcks/ordem-mcu.git
cd ordem-mcu
python -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Créditos

Capas obtidas via Wikipedia. Feito por [devrafcks](https://github.com/devrafcks).
