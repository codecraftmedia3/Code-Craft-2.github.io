
/* =========================
   LOADER + GLOBAL STATE
========================= */




const loader = document.getElementById("loader");
//find last session page cache and set it to current session page state

/* =========================
    SOUND SYSTEM
========================= */
var checksoundcache = () => { 
  //check sound data from pervious session allows activation 
  let cache = localStorage.getItem('cc_sound_cache_exist') ? console.log('exist') :  console.log('no')
  if(!cache){
      localStorage.setItem('cc_sound_cache',true);
     
      localStorage.setItem('cc_sound_cache_exist',true)
      return true;
  }
  return  cache;
}
//session sound depend on last session user perference information
var Sound_active = checksoundcache();

const clickSound = (audio_url)=>{
  return new Audio("./asset/sfx/" + audio_url);
}
let soundbe  =  (isPrime)  => { 

  if(!Sound_active) return 'empty';
  let sounds = ["new-notification-09-352705.mp3", "FX (13) (consolidated).wav"," new-notification-010-352755.mp3"]
  if(isPrime){
    return  sounds[0];    
  }
  if(typeof(isPrime)=='number' && isPrime <= sounds.length )return sound[isPrime]
  return sounds[2];

  
}


/* =========================
   WAIT FOR FULL LOAD FIRST

========================= */

window.addEventListener("load", () => {

  // footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  //check  the  url and give it location detail 
  let url = window.location.href;
  let pagebe = ['home', 'contact', 'project'];
  let current_page = pagebe.find(page => url.includes(page)) || 'home';
  // if url has page detail then navigate to it otherwise navigate to home
  if(!!current_page) {
    root_Nav(current_page);
  }
  
  // ensure loader always shows then exits cleanly
  setTimeout(() => {
    //  loading exist with sfx

    if (loader) loader.classList.add("hide");
    let loadSounddbe = clickSound(soundbe(1))
    loadSounddbe.play()
    startAnimations(); // ONLY START AFTER LOAD

  }, 700);
});

/* =========================
   MAIN APP START
========================= */
function startAnimations() {

  const sections = document.querySelectorAll(".container");
  const navLinks = document.querySelectorAll(".side-nav a");

  /* ================= HERO ================= */
  const heroTitle = document.querySelector(".hero h1");
  const heroSub = document.querySelector(".hero h2");

  setTimeout(() => heroTitle?.classList.add("show"), 200);
  setTimeout(() => heroSub?.classList.add("show"), 500);

  /* ================= OBSERVER (FORWARD + REVERSE) ================= */
  let  runObserver = () => { const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {

          const section = entry.target;
          const id = section.id;

          if (entry.isIntersecting) {

            // ENTER VIEW
            section.classList.add("show");

            // NAV ACTIVE
            navLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id
              );
            });

            // CARD STAGGER
            const cards = section.querySelectorAll(".detail-content");
        
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, i * 120);
            });

          } else {

            // EXIT VIEW (REVERSE ANIMATION)
            section.classList.remove("show");

          }
        });
      },
      {
        threshold: 0.30
      }
    );
    sections.forEach((sec) => {
        sec.classList.remove("show");
        observer.observe(sec);
    });
    }

  let Ismobile =  window.navigator.userAgentData ? window.navigator.userAgentData.mobile : /Mobi|Android|iphone/i.test(navigator.userAgent);
  if(!Ismobile){
    runObserver();
  }else{
     //mobile devices have a lot of performance issue with observer so we will just show all section without animation  
    sections.forEach((sec) => sec.classList.add("show"));
    
  }

  

  /* ================= SCROLL PROGRESS LINE ================= */
  window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    const nav = document.querySelector(".side-nav");

    if (nav) {
      nav.style.setProperty("--progress", progress + "%");
    }
  });
  

  /* ================= CLICK SOUND ================= */
  document.addEventListener("click", (e) => {
    const isPrimary  = e.target.classList.contains("primary") || e.target.closest(".primary");
    const isClickable = e.target.tagName === "A" || e.target.closest("button");

    if (isClickable  && isPrimary) {
      
      let clickSoundbe = clickSound(soundbe(isPrimary))
      clickSoundbe.currentTime = 0;
      clickSoundbe.play();
    }
  });

  /* ================= PROJECT FILTER ================= */
  const categoryButtons = document.querySelectorAll(".projects-only button");
  const categorySections = document.querySelectorAll(".project-section");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      categoryButtons.forEach((btn) =>
        btn.classList.toggle("active", btn === button)
      );

      categorySections.forEach((section) => {
        section.classList.toggle(
          "active",
          section.dataset.category === category
        );
      });
    });
  });
}
//spa navigation 

var check_page_cache = ()  => {
  let cache = localStorage.getItem('cc_page_cache') ? console.log(true) : console.log(false);
  if(!cache){
    localStorage.setItem('cc_page_cache','home')
    return 'home';
  }

  return localStorage.getItem('cc_page_cache');
}

function root_Nav(root) {
  let pages = ['home', 'contact', 'project'];
  if (pages.includes(root)) {
    console.log('changing page')
    pages.forEach((id) => {
      document.querySelector(`.${id}-root`).style.display = id === root ? 'block' : 'none';
    });
    window.location.hash = root;
  }
}


function toggle_sound(){
  console.log(Sound_active ? sound_active == false :  sound_active == true)
}

//=========CHECH IF DETAIL-CONTENT more btn CARD IS CLIKED ===========


