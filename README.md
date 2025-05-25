# 🧠 Memory Web - Juego de Memoria

Este proyecto es una aplicación web del clásico juego **Memory**, desarrollada como parte del ciclo **Desarrollo de Aplicaciones Multiplataforma (DAMvi)**. El objetivo del juego es encontrar todas las parejas de imágenes ocultas en el menor tiempo posible y con la menor cantidad de intentos.

---

## 🎮 Características

- 🧩 Juego de memoria con cartas emparejadas
- ⏱️ Temporizador para medir la duración de la partida
- 🎯 Contador de intentos realizados
- 🏆 Sistema de puntuación y records almacenados con `localStorage`
- 👥 Selección de nivel (número de cartas)
- 💾 Gestión de las mejores partidas (ranking local)
- ✅ Diseño responsive y uso de **Bootstrap**

---

## 🧰 Tecnologías utilizadas

- **HTML5** y **CSS3**
- **JavaScript** para la lógica del juego
- **Bootstrap 5** para el diseño y componentes responsivos
- **LocalStorage** para persistencia de datos del usuario (puntajes y records)

---

## 📂 Estructura del proyecto

```
memory-web/
│
├── css/
│   └── styles.css           # Estilos personalizados
│
├── js/
│   ├── config.js            # Configuración del juego
│   ├── game.js              # Lógica principal del juego
│   └── ranking.js           # Gestión de records
│
├── index.html               # Página principal del juego
├── img/                     # Imágenes de las cartas
└── README.md
```

---

## 💡 Posibles mejoras

- Añadir efectos sonoros y animaciones
- Guardar rankings en la nube (usando PHP/MySQL o Firebase)
- Temas visuales personalizados
- Integración de login de usuario

👨‍💻 Autor
**Adrián Sánchez Martín**
Estudiante de DAMvi – Institut Sabadell
