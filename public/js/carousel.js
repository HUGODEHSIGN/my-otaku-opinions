const rootNode = document.querySelector('.embla');
const viewportNode = document.querySelector('.embla__viewport');
const options = { loop: true };

const prevButtonNode = document.querySelector('.embla__prev');
const nextButtonNode = document.querySelector('.embla__next');

const embla = EmblaCarousel(viewportNode, options);

prevButtonNode.addEventListener('click', embla.scrollPrev, false);
nextButtonNode.addEventListener('click', embla.scrollNext, false);

console.log(embla.slideNodes()); // Access API
