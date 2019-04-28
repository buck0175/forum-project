const $dropdown = document.getElementById('dropdown');

$dropdown.addEventListener('click', (e) => {
  return $dropdown.classList.toggle('hide');
});

// if($dropdown.style.display === "block"){
//   $dropdown.addEventListener('click', (e) => {
//     $dropdown.style.display = 'none';
//   })
// }
