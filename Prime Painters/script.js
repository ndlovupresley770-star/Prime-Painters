document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200; // Lower is faster

  const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText.replace(/[^0-9]/g, "");
    const increment = target / speed;

    if (count < target) {
      // Retain suffixes like '+', '%', or '-Star'
      let suffix = "";
      if (counter.innerText.includes("+")) suffix = "+";
      if (counter.innerText.includes("%")) suffix = "%";
      if (counter.innerText.includes("-Star")) suffix = "-Star";

      counter.innerText = Math.ceil(count + increment) + suffix;
      setTimeout(() => runCounter(counter), 15);
    } else {
      let suffix = "";
      if (counter.innerText.includes("+")) suffix = "+";
      if (counter.innerText.includes("%")) suffix = "%";
      if (counter.innerText.includes("-Star")) suffix = "-Star";
      counter.innerText = target + suffix;
    }
  };

  // Trigger when visible in viewport
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => runCounter(counter));
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 },
  );

  const section = document.querySelector(".trust-stats-section");
  if (section) observer.observe(section);
});
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  let animated = false;

  const runCounters = () => {
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute("data-target"));
      const suffix = counter.getAttribute("data-suffix") || "";
      const decimals = parseInt(counter.getAttribute("data-decimals")) || 0;
      const speed = 200; // Lower is faster

      let current = 0;
      const increment = target / speed;

      const updateCount = () => {
        current += increment;
        if (current < target) {
          counter.innerText = current.toFixed(decimals) + suffix;
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target.toFixed(decimals) + suffix;
        }
      };

      updateCount();
    });
  };

  // Trigger animation when the stats section scrolls into view
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            runCounters();
            animated = true;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(statsSection);
  }
});

function toggleFaq(button) {
  const item = button.parentElement;
  const answer = item.querySelector(".faq-answer");
  const icon = button.querySelector(".faq-icon");

  // Close all other open accordion items (optional accordion behavior)
  document.querySelectorAll(".faq-item").forEach((otherItem) => {
    if (otherItem !== item) {
      otherItem.querySelector(".faq-answer").style.maxHeight = null;
      otherItem.querySelector(".faq-answer").style.padding = "0 2rem";
      otherItem.querySelector(".faq-icon").textContent = "+";
    }
  });

  // Toggle current item
  if (answer.style.maxHeight && answer.style.maxHeight !== "0px") {
    answer.style.maxHeight = null;
    answer.style.padding = "0 2rem";
    icon.textContent = "+";
  } else {
    answer.style.maxHeight = answer.scrollHeight + "px";
    answer.style.padding = "0 2rem 1.5rem 2rem";
    icon.textContent = "−";
  }
}

const transformationData = {
  living: {
    title: "Living Room Transformation",
    beforeImg: "path-to-living-before.jpg",
    afterImg: "path-to-living-after.jpg",
    beforeList: [
      "Dull, tired wall surfaces",
      "Scuff marks and blemishes",
      "Outdated color palettes",
      "Minor wall imperfections",
    ],
    afterList: [
      "Fresh, contemporary color",
      "Immaculately clean walls",
      "Sharp, crisp trim lines",
      "Completely revitalized ambiance",
    ],
  },
  bedroom: {
    title: "Bedroom Transformation",
    beforeImg: "path-to-bedroom-before.jpg",
    afterImg: "path-to-bedroom-after.jpg",
    beforeList: [
      "Faded paint condition",
      "High-contact marks on walls",
      "Outdated color scheme",
    ],
    afterList: [
      "Fresh neutral color profile",
      "Smooth, flawless finish",
      "Refreshed and serene atmosphere",
    ],
  },
  hallway: {
    title: "Hallway Transformation",
    beforeImg: "path-to-hallway-before.jpg",
    afterImg: "path-to-hallway-after.jpg",
    beforeList: [
      "Heavy high-traffic marks",
      "Scuffed baseboards & walls",
      "Dirty-looking surface appearance",
    ],
    afterList: [
      "Clean, durable finish",
      "Scuff-resistant coating",
      "Crisp edges and clean lines",
    ],
  },
};

function slideImages(val) {
  const wrapper = document.getElementById("img-before-wrapper");
  const handle = document.getElementById("slider-handle");
  wrapper.style.width = val + "%";
  handle.style.left = val + "%";
}

function switchTransform(category) {
  // Update active tab styling
  document.querySelectorAll(".transform-tab").forEach((btn) => {
    btn.style.background = "var(--bg-light)";
    btn.style.color = "var(--dark)";
    btn.style.border = "1px solid var(--border)";
  });
  event.currentTarget.style.background = "var(--primary)";
  event.currentTarget.style.color = "white";
  event.currentTarget.style.border = "none";

  // Update content data
  const data = transformationData[category];
  document.getElementById("panel-title").innerText = data.title;
  document.getElementById("img-before").src = data.beforeImg;
  document.getElementById("img-after").src = data.afterImg;

  // Update lists
  const beforeListEl = document.getElementById("list-before");
  beforeListEl.innerHTML = data.beforeList
    .map((item) => `<li>${item}</li>`)
    .join("");

  const afterListEl = document.getElementById("list-after");
  afterListEl.innerHTML = data.afterList
    .map((item) => `<li>${item}</li>`)
    .join("");

  // Reset slider to middle
  document.getElementById("transform-slider").value = 50;
  slideImages(50);
}


  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const servicesDropdown = document.getElementById('servicesDropdown');
  const dropdownTrigger = servicesDropdown.querySelector('.dropdown-trigger');

  // Toggle slide-out menu drawer
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Toggle Services dropdown accordion on mobile tap without breaking link behavior
  dropdownTrigger.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      servicesDropdown.classList.toggle('mobile-open');
    }
  });

