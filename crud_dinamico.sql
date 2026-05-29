-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29/05/2026 às 03:34
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `crud_dinamico`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `jogos`
--

CREATE TABLE `jogos` (
  `id` int(11) NOT NULL,
  `nome` varchar(120) NOT NULL,
  `desenvolvedora` varchar(150) NOT NULL,
  `genero` varchar(200) NOT NULL,
  `nota` decimal(2,1) NOT NULL,
  `plataforma` varchar(100) NOT NULL,
  `status_jogo` varchar(50) NOT NULL,
  `capa` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `jogos`
--

INSERT INTO `jogos` (`id`, `nome`, `desenvolvedora`, `genero`, `nota`, `plataforma`, `status_jogo`, `capa`) VALUES
(3, 'Death Stranding', 'Kojima Productions', 'Aventura,Simulação,História', 4.9, 'Todas', 'Backlogged', '../img/1780017892_death-stranding-cover1.jpg'),
(5, 'Omori', 'OMOCAT', 'Terror,RPGMaker,Aventura', 3.0, 'PC', 'Wishlist', '../img/1780017861_Capa_de_Omori.jpeg'),
(6, 'Elden Ring Nightreign', 'FromSoftware', 'Ação,RPG,Soulslike,Coop,Roguelike', 3.0, 'PC', 'Jogando', '../img/1780017933_6a6d640665d7f579f0cae5d7337785252adc03abb49a0a37.avif'),
(7, 'Baldur\'s Gate 3', 'Larian Studios', 'RPG,Aventura,Mundo Aberto,Estratégia,Turno', 5.0, 'Todos', 'Backlogged', '../img/1780017917_71TGuDCUDrL._AC_UF1000,1000_QL80_.jpg'),
(8, 'Final Fantasy', 'Square Enix', 'Ação,RPG,Aventura,Mundo Aberto,Estratégia', 3.0, 'Todas', 'Joguei', '../img/1780017967_14572-1634132106.jpg'),
(9, 'Mewgenics', ' Edmund McMillen, Tyler Glaiel', 'Aventura,Estratégia,Simulação,Roguelite', 5.0, 'PC', 'Jogando', '../img/1780017986_Mewgenics_Poster.jpg'),
(11, 'Shadow of the Colossus (2018)', 'Bluepoint', 'Ação,Aventura,Mundo Aberto,Estratégia', 5.0, 'PlayStation', 'Joguei', '../img/1780018010_13c4K2rs7knjs7aMjTAL4mib.webp'),
(13, 'Nioh 2', 'Team Ninja', 'RPG,Aventura,Terror,Soulslike', 3.0, 'Todas', 'Joguei', '../img/1780018027_Nioh_2_capa.jpg'),
(14, 'Redfall', 'Arkane Studios', 'Ação,RPG,Terror,Survival,FPS,Mundo Aberto', 1.0, 'Xbox', 'Jogando', '../img/1780018045_Capa_do_jogo_Redfall.jpg'),
(15, 'The Legend of Zelda: Breath of The Wild', 'Nintendo Entertainment Planning & Development', 'Ação,RPG,Aventura,Mundo Aberto,Puzzle,Luta,Estratégia', 4.8, 'Nintendo', 'Wishlist', '../img/1780018065_Legend_of_Zelda_Breath_of_the_Wild_capa.png'),
(17, 'Fable', 'Playground Games', 'RPG,Simulação', 3.8, 'Xbox', 'Wishlist', '../img/1780018093_4vuemt6urnya1 (1).png'),
(30, 'The Elder Scrolls V: Skyrim', 'Bethesda', 'RPG,Mundo Aberto,Ação,Aventura', 3.6, 'PC', 'Jogando', '../img/1780018223_The_Elder_Scrolls_5_Skyrim_capa.png');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `jogos`
--
ALTER TABLE `jogos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `jogos`
--
ALTER TABLE `jogos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
