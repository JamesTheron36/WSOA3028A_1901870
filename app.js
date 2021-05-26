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