const $dropdown = document.getElementById('dropdown');
const $menu = document.getElementById('menu');

$dropdown.addEventListener('click', (e) => {
  $menu.classList.toggle("hide");
});


// if($dropdown.style.display === "block"){
//   $dropdown.addEventListener('click', (e) => {
//     $dropdown.style.display = 'none';
//   })
// }
