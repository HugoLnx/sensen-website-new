import type { Game } from '../types';

export const gamesMock: Game[] = [
  {
    id: 1,
    title: "Typomancer",
    slug: "typomancer",
    image: "/images/game1_cover.jpg",
    video: "/videos/game1_preview.mp4",
    description: "games.typomancer.description",
    developer: "Sensen Games",
    price: 6.99,
    genre: ["acao", "aventura", "indie"],
    rating: 4.5,
    release_date: "15-10-2021T00:00:00.000Z",
    players: "Single-player",
    platforms: ["PC"],
    storeLinks: {
      press: "https://drive.google.com/drive/folders/1aNr4rs7a00bvgeaZWR2LrgNhQhUeDLd8",
      steam: "https://store.steampowered.com/app/1714300/Typomancer_in_the_Feathers_Way/?curator_clanid=40365443"
    },
    features: [
      "Mais de 5000 palavras: Nosso vocabulário conta com quase 5500 palavras EM INGLÊS, que são agrupadas pelo uso no seu dia a dia, palavras incomuns são utilizadas em alguns inimigos para dificultá-los um pouco. As palavras do vocabulário serão em inglês independente do idioma da interface.",
      "4 níveis de dificuldade: Fácil (menos de 40 palavras por minuto), Médio (menos de 60 palavras por minuto), Difícil (menos de 80 palavras por minuto), Insano (mais de 80 palavras por minuto).",
      "Múltiplos Formatos de Teclado: Além do formato QWERTY (o mais comum), nós também suportamos AZERTY, Dvorak, Workman e Colemak.",
      "Importe seu próprio vocabulário: Importe sua lista de palavras para jogar! Só funciona com palavras em inglês, as palavras com caracteres especiais serão ignoradas.",
      "Desabilite as palavras incomuns: Se você não quiser jogar com palavras incomuns, você pode desabilitar-las.",
      "Modo Imortal: Continue jogando mesmo se você perder. Sua pontuação não irá mais aumentar porém você continuará treinando!",
      "Ondas: 5 ondas que juntam diferentes inimigos com diferentes dificuldades de palavras e frases maiores!",
      "Quadro de classificação: Lute pela maior pontuação. (Integração com a Steam)",
      "Conquistas: 51 conquistas para você conquistar. (Integração com a Steam)",
      "Direto para Ação: Você não precisará dar voltar com um monte de texto e customizações que demoram horas. Aproveite a campanha de jogador único cheia de ação e desafio.",
      "6 levels e um chefão: O jogo conta com 6 níveis e um chefão final para você superar!",
      "Integração com a Steam Cloud"
    ],
    systemRequirements: {
      minimum: {
        OS: "Windows 7 or Later",
        CPU: "Intel Core 2 Duo 1.6 GHz",
        RAM: "3 GB",
        GPU: "DirectX 10 compatible",
        Armazenamento: "100 MB"
      },
      recommended: {
        OS: "Windows 11",
        CPU: "Intel i7 ou equivalente",
        RAM: "16 GB",
        GPU: "RTX 2060",
        Armazenamento: "1 GB"
      }
    }
  },
  {
    id: 2,
    title: "Tyfortress",
    slug: "tyfortress",
    image: "/images/game2_cover.jpg",
    video: "/videos/game2_preview.mp4",
    description: "games.tyfortress.description",
    developer: "Sensen Games",
    price: 13.79,
    genre: ["acao", "estrategia", "indie", "simulacao"],
    rating: 4.2,
    release_date: "05-08-2021T00:00:00.000Z",
    players: "Single-player",
    platforms: ["PC"],
    storeLinks: {
      press: "https://drive.google.com/drive/folders/1yJ3gsKTpK14ovogckSVvxcz854f-fpyo",
      steam: "https://store.steampowered.com/app/1661700/Tyfortress_Tactical_Typing/?curator_clanid=40365443"
    },
    features: [
      "Mais de 5000 palavras: Nosso vocabulário conta com quase 5500 palavras EM INGLÊS, que são agrupadas pelo uso no seu dia a dia, palavras incomuns são utilizadas em alguns inimigos para dificultá-los um pouco. As palavras do vocabulário serão em inglês independente do idioma da interface.",
      "More than 500 phrases: Our phrases list has almost 550 phrases, in which the game will increase the length of the phrases as you advance through the waves.",
      "Phrases from famous books, philosophers and writers like: The Little Prince, Sherlock Holmes, Alice's Adventures in Wonderland, Dracula, Peter Pan, Jules Verne, Jane Austen, Socrates, Aristotle, Baruch Spinoza, and more.",
      "4 níveis de dificuldade: Fácil (menos de 40 palavras por minuto), Médio (menos de 60 palavras por minuto), Difícil (menos de 80 palavras por minuto), Insano (mais de 80 palavras por minuto).",
      "Importe seu próprio vocabulário: Importe sua lista de palavras para jogar! Só funciona com palavras em inglês, as palavras com caracteres especiais serão ignoradas.",
      "Desabilite as palavras incomuns: Se você não quiser jogar com palavras incomuns, você pode desabilitar-las.",
      "Modo Imortal: Continue jogando mesmo se você perder. Sua pontuação não irá mais aumentar porém você continuará treinando!",
      "Ondas: 5 ondas que juntam diferentes inimigos com diferentes dificuldades de palavras e frases maiores!",
      "Quadro de classificação: Lute pela maior pontuação. (Integração com a Steam)",
      "Conquistas: 95 conquistas para você conquistar. (Integração com a Steam)",
      "Direto para Ação: Você não precisará dar voltar com um monte de texto e customizações que demoram horas. Aproveite a campanha de jogador único cheia de ação e desafio.",
      "Integração com a Steam Cloud"
    ],
    systemRequirements: {
      minimum: {
        OS: "Windows 7 or Later",
        CPU: "Intel Core 2 Duo 1.6 GHz",
        RAM: "3 GB",
        GPU: "DX10, DX11, DX12 compatible",
        Armazenamento: "100 MB"
      },
      recommended: {
        OS: "Windows 11",
        CPU: "Intel i7",
        RAM: "16 GB",
        GPU: "RTX 3060",
        Armazenamento: "1 GB"
      }
    }
  },
  {
    id: 3,
    title: "Tybot Invasion",
    slug: "tybot-invasion",
    image: "/images/game3_cover.jpg",
    video: "/videos/game3_preview.mp4",
    description: "games.tybot-invasion.description",
    developer: "Sensen Games",
    price: 13.79,
    genre: ["acao", "casual", "indie"],
    rating: 4.8,
    release_date: "09-06-2021T00:00:00.000Z",
    players: "Single-player",
    platforms: ["PC"],
    storeLinks: {
      press: "https://drive.google.com/drive/folders/1rd6U_k5JU74TSJQgf4H5NViwgNX-GgtU",
      steam: "https://store.steampowered.com/app/1636000/Tybot_Invasion_The_Typing_Runner/"
    },
    features: [
      "Mais de 5000 palavras: Nosso vocabulário conta com quase 5500 palavras EM INGLÊS, que são agrupadas pelo uso no seu dia a dia, palavras incomuns são utilizadas em alguns inimigos para dificultá-los um pouco. As palavras do vocabulário serão em inglês independente do idioma da interface.",
      "4 níveis de dificuldade: Fácil (menos de 40 palavras por minuto), Médio (menos de 60 palavras por minuto), Difícil (menos de 80 palavras por minuto), Insano (mais de 80 palavras por minuto).",
      "Importe seu próprio vocabulário: Importe sua lista de palavras para jogar! Só funciona com palavras em inglês, as palavras com caracteres especiais serão ignoradas.",
      "Desabilite as palavras incomuns: Se você não quiser jogar com palavras incomuns, você pode desabilitar-las.",
      "Modo Imortal: Continue jogando mesmo se você perder. Sua pontuação não irá mais aumentar porém você continuará treinando!",
      "Ondas: 5 ondas que juntam diferentes inimigos com diferentes dificuldades de palavras.",
      "Quadro de classificação: Lute pela maior pontuação. (Integração com a Steam)",
      "Conquistas: 83 conquistas para você conquistar. (Integração com a Steam)",
      "Direto para Ação: Você não precisará dar voltar com um monte de texto e customizações que demoram horas. Aproveite a campanha de jogador único cheia de ação e desafio.",
      "Integração com a Steam Cloud"
    ],
    systemRequirements: {
      minimum: {
        OS: "Windows 7 or Later",
        CPU: "Intel Core 2 Duo 1.6 GHz",
        RAM: "3 GB",
        GPU: "DX10, DX11, DX12 compatible",
        Armazenamento: "100 MB"
      },
      recommended: {
        OS: "Windows 11",
        CPU: "Intel i7",
        RAM: "16 GB",
        GPU: "RTX 3060",
        Armazenamento: "1 GB"
      }
    }
  },
  {
    id: 4,
    title: "Smashing Spirits",
    slug: "smashing-spirits",
    image: "/images/game4_cover.jpg",
    video: "/videos/game4_preview.mp4",
    description: "games.smashing-spirits.description",
    developer: "Sensen Games",
    price: 16.99,
    genre: ["acao", "aventura", "indie"],
    rating: 4.9,
    release_date: "10-09-2020T00:00:00.000Z",
    players: "Single-player",
    platforms: ["PC"],
    storeLinks: {
      press: "https://drive.google.com/drive/folders/1CpzChi7TBAwNiPjdwILv5z10wt7JjfEs",
      steam: "https://store.steampowered.com/app/1263200/Smashing_Spirits_A_Primeira_Boxeadora_Brasileira/"
    },
    features: [
      "Integração com Steam: Salvar na Nuvem da Steam.",
      "Chefes Nostálgicos: 4 chefes difíceis com movimentos baseados em padrão como os clássicos sidescrollers!",
      "Direto para Ação: Sem ficar enrolando com um monte de textos e customizações que levam horas. Curta uma campanha individual cheia de duros combates contra mais de 30 inimigos distribuídos em 5 níveis.",
      "Ajuste de Dificuldade: Muito difícil para você? Sem problemas, nós fizemos um modo “Nutella” só para você!",
      "Mecânicas Desbloqueáveis: Ganhe novas habilidades para ter mais opções de esquiva e ataque!",
      "Controles Responsivos: Mova com precisão e velocidade usando os controles responsivos que nós implementamos!",
      "Suporte Completo à Controles: Nós reconhecemos mais de 30 tipos de controles. Use nossa configuração recomendada ou configura as ações de sua preferência."
    ],
    systemRequirements: {
      minimum: {
        OS: "Windows 7 or Later",
        CPU: "Intel Core 2 Duo 1.6 GHz",
        RAM: "3 GB",
        GPU: "DX10, DX11, DX12 compatible",
        Armazenamento: "100 MB"
      },
      recommended: {
        OS: "Windows 11",
        CPU: "Intel i7 ou equivalente",
        RAM: "16 GB",
        GPU: "RTX 2060",
        Armazenamento: "10 GB"
      }
    }
  },
  {
    id: 5,
    title: "Neon Ships",
    slug: "neon-ships",
    image: "/images/game5_cover.jpg",
    video: "/videos/game5_preview.mp4",
    description: "games.neon-ships.description",
    developer: "Sensen Games",
    price: 13.79,
    genre: ["acao", "casual", "indie"],
    rating: 4.7,
    release_date: "11-02-2021T00:00:00.000Z",
    players: "Single-player",
    platforms: ["PC"],
    storeLinks: {
      press: "https://drive.google.com/drive/folders/1ZIDbyLLibq2SsW1_AS9ckbgjPeRD_2Nq",
      steam: "https://store.steampowered.com/app/1528580/Neon_Ships_The_Typeem_Up_Shooter/?curator_clanid=40365443"
    },
    features: [
      "Cloud Save (Steam Integration)",
      "Leaderboard: Fight for the highscore. (Steam Integration)",
      "Achievements: 17 achievements for conquer. (Steam Integration)",
      "Nostalgic Bosses: 3 tough bosses with pattern-base attacks like the classics.",
      "Straight to Action: No running around with lots of texts or customizations that take hours. Just enjoy a single player campaign full of action and challenge!",
      "Multiple Keyboard Layouts: Beyond the most common QWERT we also support AZERTY, Dvorak, Workman and Colemak."
    ],
    systemRequirements: {
      minimum: {
        OS: "Windows 7 or Later",
        CPU: "Intel Core 2 Duo 1.6 GHz",
        RAM: "3 GB",
        GPU: "DX10, DX11, DX12 compatible",
        Armazenamento: "100 MB"
      },
      recommended: {
        OS: "Windows 11",
        CPU: "Intel i7",
        RAM: "16 GB",
        GPU: "RTX 3060",
        Armazenamento: "1 GB"
      }
    }
  },
  {
    id: 6,
    title: "Kings Bullseye",
    slug: "kings-bullseye",
    image: "/images/game6_cover.jpg",
    video: "/videos/game6_preview.mp4",
    description: "games.kings-bullseye.description",
    developer: "Sensen Games",
    price: 24.99,
    genre: ["acao", "casual", "indie"],
    rating: 4.9,
    release_date: "15-05-202T00:00:00.000Z",
    players: "Single-player",
    platforms: ["PC"],
    storeLinks: {
      press: "https://drive.google.com/drive/folders/1rAcBWtHtE8VGHVKXaP7lbo2AueYfAw7t",
      steam: "https://store.steampowered.com/app/1600870/King_Bullseye_Headshot_Training/?curator_clanid=40365443"
    },
    features: [
      "Leaderboard: Você competirá pela maior pontuação dentre todos os jogadores! (Integração com a Steam)",
      "Conquistas: 26 conquistas para te incentivar a dar o seu melhor! (Integração com a Steam)",
      "Suporte para \"Arma de Luz\": Se você tem uma joystick de arma que usa as coordenadas do mouse, pode jogar sem problemas, basta ativar o suporte no menu do pause!",
      "Sensitividade do Mouse: Configure a sensibilidade que lhe for mais confortável no menu do pause.",
      "Modo \"Nunca Morre\": Continue jogando mesmo que você tenha perdido todos os escudos! Sua pontuação congelará mas você pode continuar treinando!",
      "Ondas de Inimigos: 3 ondas de inimigos que misturam padrões e quantidade de movimentos em um único turno!",
      "Direto para a Ação: Sem customizações, diálogos, etc. Só vá direto para a ação e desafio!",
      "Suporte à Controle só durante o jogo: Você pode usar um controle de xbox, ps4, etc durante o jogo, mas no menu de pause é necessário usar o mouse. (É provável que fique bem difícil de jogar no controle)",
      "Save na Nuvem (Integração com a Steam)"
    ],
    systemRequirements: {
      minimum: {
        OS: "Windows 7 or Later",
        CPU: "Intel Core 2 Duo 1.6 GHz",
        RAM: "3 GB",
        GPU: "DX10, DX11, DX12 compatible",
        Armazenamento: "100 MB"
      },
      recommended: {
        OS: "Windows 11",
        CPU: "Intel i7 ou equivalente",
        RAM: "16 GB",
        GPU: "RTX 2060",
        Armazenamento: "10 GB"
      }
    }
  },
  {
    id: 7,
    title: "Akuma Bloodrain",
    slug: "akuma-bloodrain",
    image: "/images/game7_cover.jpg",
    video: "/videos/game7_preview.mp4",
    description: "games.akuma-bloodrain.description",
    developer: "Sensen Games",
    price: 0,
    genre: ["acao", "demo", "indie"],
    rating: 4.8,
    release_date: "29-05-2025T00:00:00.000Z",
    players: "Single-player",
    platforms: ["PC"],
    storeLinks: {
      press: "https://drive.google.com/drive/folders/13ansk9VF6E6HvjqM0YsVeSrJ3b2A7cZY",
      steam: "https://store.steampowered.com/app/3700180/Akumas_Bloodrain_Demo/?curator_clanid=40365443"
    },
    features: [
      "Hierarquia de Patentes: Mais de 10 patentes para marcar seus avanços! Quanto mais pontos maior a honra! A patente mais alta somente um de nós (desenvolvedores) consegue conquistar! E você?",
      "Macetes Desbloqueáveis: Nós sabemos que você gosta de descobrir tudo por conta própria, mas se você ficar travado numa pontuação limite, dê uma olhada nos macetes que você já desbloqueou! Novos macetes são desbloqueados conforme você ganha mais pontos!",
      "Modo Treino: Comece com mais vida nesse modo para que você possa treinar antes de enfrentar o desafio real!",
      "Integração com Leaderboards da Steam",
      "Integração com Achievements da Steam",
      "Integração com a Cloud da Steam",
      "Reconfiguração de teclas",
      "Opções para Gráficos (resolução, v-sync, limite de fps, brilho, etc), Audio (volume de interface, voz, efeitos sonoros, etc) e Jogabilidade (sensibilidade do mouse, inverter mouse, etc)",
      "Múltiplos Idiomas: Suporte a múltiplos idiomas traduzido por profissionais!"
    ],
    systemRequirements: {
      minimum: {
        OS: "Windows 7 or later",
        CPU: "2.4GHZ Dual Core Processor",
        RAM: "4 GB",
        GPU: "GeForce 9800GT",
        Armazenamento: "600 MB de espaço disponível"
      },
      recommended: {
        OS: "Windows 11",
        CPU: "Intel i7",
        RAM: "16 GB",
        GPU: "RTX 3060",
        Armazenamento: "1 GB"
      }
    }
  },
  {
    id: 8,
    title: "Sniper Ships",
    slug: "sniper-ships",
    image: "/images/game8_cover.jpg",
    video: "/videos/game8_preview.mp4",
    description: "games.sniper-ships.description",
    developer: "Sensen Games",
    price: 13.79,
    genre: ["acao", "casual", "indie"],
    rating: 4.7,
    release_date: "26-03-2021T00:00:00.000Z",
    players: "Single-player",
    platforms: ["PC"],
    storeLinks: {
      press: "https://drive.google.com/drive/folders/1DPfYkoC2MU6y90Kw3aQc8J3VWw53-AgJ",
      steam: "https://store.steampowered.com/app/1555080/Sniper_Ships_Shootem_Up_on_Rails/?curator_clanid=40365443"
    },
    features: [
      "Leaderboard: Você competirá pela maior pontuação dentre todos os jogadores! (Integração com a Steam)",
      "Conquistas: 26 conquistas para te incentivar a dar o seu melhor! (Integração com a Steam)",
      "Chefes Nostálgicos: Três chefes durões com padrões diferentes assim como nos clássicos!",
      "Suporte para \"Arma de Luz\": Se você tem uma joystick de arma que usa as coordenadas do mouse, pode jogar sem problemas, basta ativar o suporte no menu do pause!",
      "Sensitividade do Mouse: Configure a sensibilidade que lhe for mais confortável no menu do pause.",
      "Direto para a Ação: Sem customizações, diálogos, etc. Só vá direto para a ação e desafios!",
      "Suporte à Controle só durante o jogo: Você pode usar um controle de xbox, ps4, etc durante o jogo, mas no menu de pause é necessário usar o mouse. (É provável que fique bem difícil de jogar no controle)",
      "Salve na Nuvem (Integração com a Steam Cloud)"
    ],
    systemRequirements: {
      minimum: {
        OS: "Windows 7 or Later",
        CPU: "Intel Core 2 Duo 1.6 GHz",
        RAM: "3 GB",
        GPU: "DX10, DX11, DX12 compatible",
        Armazenamento: "100 MB"
      },
      recommended: {
        OS: "Windows 11",
        CPU: "Intel i7 ou equivalente",
        RAM: "16 GB",
        GPU: "RTX 2060",
        Armazenamento: "10 GB"
      }
    }
  },
  {
    id: 9,
    title: "Spooky Typing",
    slug: "spooky-typing",
    image: "/images/game9_cover.jpg",
    video: "/videos/game9_preview.mp4",
    description: "games.spooky-typing.description",
    developer: "Sensen Games",
    price: 13.79,
    genre: ["casual", "indie"],
    rating: 5.0,
    release_date: "30-10-2021T00:00:00.000Z",
    players: "Single-player",
    platforms: ["PC"],
    storeLinks: {
      press: "https://drive.google.com/drive/folders/1L4I3bnwF6Fz-EA2URdP6Vr38kRt70O4J",
      steam: "https://store.steampowered.com/app/1791870/Spooky_Typing_The_Ghost_Plague/?curator_clanid=40365443"
    },
    features: [
      "Nessa aventura seu objetivo é chegar no final do mapa vivo.",
      "Existem obstáculos que te eliminam ao tocar, você deverá desviar deles.",
      "Existem inimigos e eles são destruídos ao digitar as palavras.",
      "Mais de 5000 palavras: Nosso vocabulário conta com quase 5500 palavras EM INGLÊS, que são agrupadas pelo uso no seu dia a dia, palavras incomuns são utilizadas em alguns inimigos para dificultá-los um pouco. As palavras do vocabulário serão em inglês independente do idioma da interface.",
      "4 níveis de dificuldade: Fácil (menos de 40 palavras por minuto), Médio (menos de 60 palavras por minuto), Difícil (menos de 80 palavras por minuto), Insano (mais de 80 palavras por minuto).",
      "Múltiplos Formatos de Teclado: Além do formato QWERTY (o mais comum), nós também suportamos AZERTY, Dvorak, Workman e Colemak.",
      "Importe seu próprio vocabulário: Importe sua lista de palavras para jogar! Só funciona com palavras em inglês, as palavras com caracteres especiais serão ignoradas.",
      "Desabilite as palavras incomuns: Se você não quiser jogar com palavras incomuns, você pode desabilitar-las.",
      "Modo Imortal: Continue jogando mesmo se você perder. Sua pontuação não irá mais aumentar porém você continuará treinando!",
      "Conquistas: 45 conquistas para você conquistar. (Integração com a Steam)",
      "Direto para Ação: Você não precisará dar voltar com um monte de texto e customizações que demoram horas. Aproveite a campanha de jogador único cheia de ação e desafio."
    ],
    systemRequirements: {
      minimum: {
        OS: "Windows 7 or Later",
        CPU: "Intel Core 2 Duo 1.6 GHz",
        RAM: "3 GB",
        GPU: "DX10, DX11, DX12 compatible",
        Armazenamento: "100 MB"
      },
      recommended: {
        OS: "Windows 11",
        CPU: "Intel i7",
        RAM: "16 GB",
        GPU: "RTX 3060",
        Armazenamento: "1 GB"
      }
    }
  },
];