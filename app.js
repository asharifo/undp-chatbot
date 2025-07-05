window.addEventListener('load', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const backgroundHero = document.getElementById('mountain');
    const foregroundHero = document.getElementById('foreground');
    const heroContent= document.querySelector('.hero-content');

    navbar.classList.add('open');
    hero.classList.add('show');

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      console.log('scrollY =', y);
      backgroundHero.style.transform = `translateY(${y * -0.1}px)`;
      foregroundHero.style.transform = `translateY(${y * -0.7}px)`;
      heroContent.style.transform = `translateY(${y * 0.3}px)`;
    });
  });



const rowPrompts = [
  [
    "What are the recommended evacuation routes for wildfires in my region?",
    "How should I prepare my family for a possible tsunami warning?",
    "What emergency kit items are essential for earthquake evacuation?",
    "When will authorities issue evacuation orders for hurricanes?"
  ],
  [
    "Provide recent flood frequency statistics in my country.",
    "What is the average annual number of earthquakes in my region?",
    "Show historical data on landslide incidents locally.",
    "Which natural disasters pose the greatest risk here?"
  ],
  [
    "How can I develop a family evacuation plan for cyclones?",
    "Where can I find approved shelters during severe storms?",
    "Who coordinates local disaster response efforts?",
    "What communication channels are used for evacuation alerts?"
  ]
];


window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".marquee").forEach((marquee, idx) => {
    rowPrompts[idx].concat(rowPrompts[idx]).forEach(text => {
      const span = document.createElement("span");
      span.textContent = text;
      marquee.appendChild(span);
    });
  });
});

