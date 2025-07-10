import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


window.addEventListener("load", () => {
  const navbar = document.querySelector(".navbar");
  const hero = document.querySelector(".hero");
  const backgroundHero = document.getElementById("mountain");
  const foregroundHero = document.getElementById("foreground");
  const heroContent = document.querySelector(".hero-content");

  // Hero animations
  navbar.classList.add("open");
  hero.classList.add("show");

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    heroContent.style.transform = `translateY(${y * 0.7}px)`;
  });
});

// Carousel span text
const rowPrompts = [
  [
    "What are the recommended evacuation routes for wildfires in my region?",
    "How should I prepare my family for a possible tsunami warning?",
    "What emergency kit items are essential for earthquake evacuation?",
    "When will authorities issue evacuation orders for hurricanes?",
  ],
  [
    "Provide recent flood frequency statistics in my country.",
    "What is the average annual number of earthquakes in my region?",
    "Show historical data on landslide incidents locally.",
    "Which natural disasters pose the greatest risk here?",
  ],
  [
    "How can I develop a family evacuation plan for cyclones?",
    "Where can I find approved shelters during severe storms?",
    "Who coordinates local disaster response efforts?",
    "What communication channels are used for evacuation alerts?",
  ],
];

// Create carousel spans
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".marquee").forEach((marquee, idx) => {
    rowPrompts[idx].concat(rowPrompts[idx]).forEach((text) => {
      const span = document.createElement("span");
      span.textContent = text;
      marquee.appendChild(span);
    });
  });
});

// Document, chatbot, and about section animations
const targets = document.querySelectorAll(
  ".documents-text, .chatbot-text, .about-container-1, .about-container-2"
);

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0,
  }
);

targets.forEach((target) => observer.observe(target));

// Change color when user scrolls to #Chatbot section
const wrapper = document.querySelector(".color-change");
const sec2Top = document.getElementById("chatbot").offsetTop;

window.addEventListener('scroll', () => {
  if (window.scrollY >= sec2Top - 700) {
    wrapper.classList.add('scrolled');
  } else {
    wrapper.classList.remove('scrolled');
  }
});

// Create THREE.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 700, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, 700);
camera.position.setZ(5);
renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff, 20);
pointLight.position.set(0, 5, -5);
const ambientLight = new THREE.AmbientLight(0x1f5a95);

camera.add(pointLight);
scene.add(ambientLight, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;


// Country list + rotation state
const countries = [
  { name: 'Vietnam', lat: 14.1, lon: 108.3 },
  { name: 'Tajikistan', lat: 38.9, lon: 71.3 },
  { name: 'Kazakhstan', lat: 48.0, lon: 66.9 },
  { name: 'Turkey', lat: 38.9, lon: 35.2 },
  { name: 'Wisconsin', lat: 44.5, lon: -89.5 }
];

let currentIndex = 0;
let earthModel = null;
const countryHeader = document.querySelector('.current-country');

// Lat/Lon to Cartesian on unit sphere
function latLonToCartesian(lat, lon) {
  const φ = THREE.MathUtils.degToRad(90 - lat);
  const θ = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    Math.sin(φ) * Math.cos(θ),
    Math.cos(φ),
    Math.sin(φ) * Math.sin(θ)
  );
}

// Load Earth model and set centered on first country
const gltfLoader = new GLTFLoader();
gltfLoader.load('/earth/scene.gltf', gltf => {
  earthModel = gltf.scene;
  earthModel.scale.set(10, 10, 10);
  scene.add(earthModel);
  show(countries[currentIndex].lat, countries[currentIndex].lon);
});

// Add location marker
var spot = new THREE.Mesh(
  new THREE.SphereGeometry(0.02),
  new THREE.MeshBasicMaterial({ color: 'crimson' })
);
spot.position.copy(
  latLonToCartesian(0, 0).multiplyScalar(2));
scene.add(spot);

// Button handlers
document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % countries.length;
  countryHeader.textContent = countries[currentIndex].name;
  show(countries[currentIndex].lat,
    countries[currentIndex].lon);
});
document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + countries.length) % countries.length;
  countryHeader.textContent = countries[currentIndex].name;
  show(countries[currentIndex].lat,
    countries[currentIndex].lon);
});


// Rotate to next country's location
function show(lat, lon) {
  earthModel.rotation.set(
    0,
    THREE.MathUtils.degToRad(-lon),
    THREE.MathUtils.degToRad(-lat),
    'ZYX'
  );
}

// Render loop
function animateLoop() {
  requestAnimationFrame(animateLoop);
  controls.update();
  renderer.render(scene, camera);
}

animateLoop();



