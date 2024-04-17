const emblaNode = document.querySelector('.embla');
const options = { loop: false };

const viewportNode = document.querySelector('.embla__viewport');

const prevButtonNode = document.querySelector('.embla__prev');
const nextButtonNode = document.querySelector('.embla__next');

const emblaApi = EmblaCarousel(emblaNode, options);

const embla = EmblaCarousel(viewportNode);

prevButtonNode.addEventListener('click', embla.scrollPrev, false);
nextButtonNode.addEventListener('click', embla.scrollNext, false);

console.log(emblaApi.slideNodes()); // Access API
