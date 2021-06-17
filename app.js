const NavSlider = () =>{
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () => {
		nav.classList.toggle('nav-active')

		navLinks.forEach((link, index) => {
		if(link.style.animation){
			link.style.animation = '';
		}
		else{
			link.style.animation = `NavLinkFade 0.5s ease forwards ${index/7 + 0.8}s`
		}
		
	});

		//burger anim
		burger.classList.toggle('toggle');
	});


} 


const app = () =>{
	NavSlider();
}

app();

var x = document.getElementsByTagName("A");
var links = Array.from(x)
var click = new Audio();
click.src = "Sounds/ButtonClick.mp3";
console.log(links[0])


links.forEach(addSound);

function addSound(item) {
  item.addEventListener('click', event => {
    click.load();
    click.play();
    console.log("clicked");
  })
}

