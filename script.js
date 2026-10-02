const loader=document.getElementById("pageLoader");
const navbar=document.getElementById("navbar");
const menuBtn=document.getElementById("menuBtn");
const navMenu=document.getElementById("navMenu");
const navLinks=document.querySelectorAll("#navMenu a");
const revealItems=document.querySelectorAll(".reveal");
const videos=document.querySelectorAll(".reel-media video");

window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),450));

function updateNavbar(){navbar.classList.toggle("scrolled",window.scrollY>30)}
updateNavbar();
window.addEventListener("scroll",updateNavbar,{passive:true});

function closeMenu(){
 navMenu.classList.remove("active");
 menuBtn.classList.remove("open");
 menuBtn.setAttribute("aria-expanded","false");
 document.body.classList.remove("menu-open");
}
menuBtn.addEventListener("click",()=>{
 const open=navMenu.classList.toggle("active");
 menuBtn.classList.toggle("open",open);
 menuBtn.setAttribute("aria-expanded",String(open));
 document.body.classList.toggle("menu-open",open);
});
navLinks.forEach(link=>link.addEventListener("click",closeMenu));
document.addEventListener("click",e=>{if(navMenu.classList.contains("active")&&!navMenu.contains(e.target)&&!menuBtn.contains(e.target))closeMenu()});

const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}});
},{threshold:.12,rootMargin:"0px 0px -35px 0px"});
revealItems.forEach(item=>observer.observe(item));

videos.forEach(video=>{
 const card=video.closest(".reel-card");
 const btn=card.querySelector(".play-btn");
 btn.addEventListener("click",async e=>{
  e.stopPropagation();
  if(video.paused){
   videos.forEach(other=>{if(other!==video){other.pause();other.closest(".reel-card").querySelector(".play-btn").classList.remove("playing")}});
   try{await video.play();btn.classList.add("playing")}catch(err){console.log("Video playback error:",err)}
  }else{video.pause();btn.classList.remove("playing")}
 });
 video.addEventListener("ended",()=>btn.classList.remove("playing"));
});

const sections=[...navLinks].map(l=>document.querySelector(l.getAttribute("href"))).filter(Boolean);
const activeObserver=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(l=>l.classList.toggle("active",l.getAttribute("href")===`#${entry.target.id}`))}});
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>activeObserver.observe(s));
