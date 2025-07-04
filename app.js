window.addEventListener('load', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    navbar.classList.add('open');
    hero.classList.add('show');
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

